"""
CampusGuard Synthetic Demo Data Seeder
Populates realistic, anonymized synthetic student records and multi-day check-in histories
for hackathon evaluation. Clearly marked as synthetic demo data.
"""

import datetime
import random
import json
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
from models import Student, Checkin, RiskScore, Alert, SupportResource
from risk_engine import get_risk_engine

DEPARTMENTS = ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Biotechnology", "Civil Engineering", "Data Science"]
YEARS = [1, 2, 3, 4]

# Preset high-visibility demo profiles for hackathon presentation
FLAGSHIP_STUDENTS = [
    {
        "id": "CG-1042",
        "dept": "Computer Science",
        "year": 3,
        "profile": "burnout_trajectory", # high study, severe sleep drop, isolated
    },
    {
        "id": "CG-2381",
        "dept": "Electrical Engineering",
        "year": 2,
        "profile": "moderate_stress", # fluctuating sleep, attendance dip
    },
    {
        "id": "CG-8810",
        "dept": "Data Science",
        "year": 4,
        "profile": "severe_isolation", # low mood, often isolated, attendance falling
    },
    {
        "id": "CG-3015",
        "dept": "Mechanical Engineering",
        "year": 1,
        "profile": "freshman_transition", # mild stress, stabilizing
    },
    {
        "id": "CG-5520",
        "dept": "Biotechnology",
        "year": 2,
        "profile": "healthy_baseline", # balanced metrics
    }
]

RESOURCES_DATA = [
    {
        "category": "Emergency",
        "title": "Tele-MANAS National Mental Health Line",
        "description": "24x7 toll-free multilingual psychological support provided by the Government of India.",
        "contact_info": "14416 / 1800-891-4416",
        "availability": "24/7 Toll-Free",
        "is_emergency": True
    },
    {
        "category": "Emergency",
        "title": "KIRAN Mental Health Rehabilitation Helpline",
        "description": "National helpline for 24/7 psychological first-aid and mental health distress management.",
        "contact_info": "1800-599-0019",
        "availability": "24/7 Toll-Free",
        "is_emergency": True
    },
    {
        "category": "Counsellor",
        "title": "Confidential Campus Counsellor Booking",
        "description": "Schedule a 1-on-1 private session with certified campus wellbeing psychologists.",
        "contact_info": "wellness-counsel@campus.edu | Room 204, Student Health Wing",
        "availability": "Mon-Fri: 9:00 AM - 6:00 PM",
        "is_emergency": False
    },
    {
        "category": "Academic",
        "title": "Academic Skills & Time Management Coaching",
        "description": "Struggling with deadlines or exam preparation? Connect with peer tutors and study coaches.",
        "contact_info": "academic-support@campus.edu | Central Library 3rd Floor",
        "availability": "Mon-Sat: 10:00 AM - 7:00 PM",
        "is_emergency": False
    },
    {
        "category": "Sleep",
        "title": "Sleep & Circadian Rhythm Recovery Guide",
        "description": "Evidence-based micro-practices to reset sleep latency, reduce blue light fatigue, and improve REM quality.",
        "contact_info": "Self-guided digital toolkit + Weekly sleep hygiene clinic",
        "availability": "Always Available",
        "is_emergency": False
    },
    {
        "category": "Peer",
        "title": "Campus Peer Support Circle",
        "description": "Informal, stigma-free student-to-student discussion circles for stress relief and community connection.",
        "contact_info": "peercircles@campus.edu | Student Union Commons",
        "availability": "Every Tuesday & Thursday at 5:30 PM",
        "is_emergency": False
    },
    {
        "category": "Stress",
        "title": "Mindfulness & Stress De-escalation Pods",
        "description": "Quiet acoustic pods equipped with guided breathwork and biofeedback monitors.",
        "contact_info": "Quiet Zone, Recreation Complex",
        "availability": "Open Daily: 7:00 AM - 9:00 PM",
        "is_emergency": False
    }
]

def seed_database(num_additional_students: int = 30):
    """Initializes tables and seeds synthetic demo cohort with 14-day histories."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db: Session = SessionLocal()
    risk_engine = get_risk_engine()

    try:
        # 1. Insert Resources
        for res in RESOURCES_DATA:
            db_res = SupportResource(**res)
            db.add(db_res)
        db.commit()

        # 2. Build Student ID Cohort
        all_students_meta = []

        # Add flagship students
        for s in FLAGSHIP_STUDENTS:
            all_students_meta.append((s["id"], s["dept"], s["year"], s["profile"]))

        # Add remaining synthetic students (CG-1001 to ...)
        counter = 1001
        while len(all_students_meta) < (len(FLAGSHIP_STUDENTS) + num_additional_students):
            sid = f"CG-{counter}"
            counter += 1
            if sid in [s["id"] for s in FLAGSHIP_STUDENTS]:
                continue
            dept = random.choice(DEPARTMENTS)
            year = random.choice(YEARS)
            profile_type = random.choices(
                ["healthy_baseline", "mild_stress", "moderate_stress", "burnout_trajectory"],
                weights=[0.60, 0.20, 0.12, 0.08]
            )[0]
            all_students_meta.append((sid, dept, year, profile_type))

        # Insert student entities
        for sid, dept, year, _ in all_students_meta:
            student = Student(
                id=sid,
                department=dept,
                year=year,
                opt_in=True,
                created_at=datetime.datetime.utcnow() - datetime.timedelta(days=30)
            )
            db.add(student)
        db.commit()

        # 3. Generate 14-day history for each student
        today = datetime.date.today()
        created_alerts_count = 0

        for sid, dept, year, profile in all_students_meta:
            history_records = []

            for day_offset in range(13, -1, -1):
                checkin_date = (today - datetime.timedelta(days=day_offset)).strftime("%Y-%m-%d")
                
                # Calibrate values based on profile trajectory
                if profile == "burnout_trajectory":
                    # Deteriorating sleep and rising study
                    progress = (13 - day_offset) / 13.0 # 0 to 1
                    sleep = round(max(3.8, 7.5 - progress * 3.5 + random.uniform(-0.4, 0.4)), 1)
                    study = round(min(12.0, 6.0 + progress * 4.5 + random.uniform(-0.5, 0.5)), 1)
                    mood = max(1, min(5, int(4 - progress * 2.5 + random.uniform(-0.5, 0.5))))
                    attendance = round(max(55.0, 92.0 - progress * 26.0 + random.uniform(-2, 2)), 1)
                    isolation = "Often isolated" if progress > 0.6 else ("Sometimes isolated" if progress > 0.3 else "Connected")
                    note = "Struggling to balance lab reports and sleep." if progress > 0.7 else None

                elif profile == "severe_isolation":
                    progress = (13 - day_offset) / 13.0
                    sleep = round(max(4.5, 6.5 - progress * 1.5 + random.uniform(-0.5, 0.5)), 1)
                    study = round(random.uniform(5.0, 7.5), 1)
                    mood = max(1, min(5, int(3 - progress * 1.5 + random.uniform(-0.4, 0.4))))
                    attendance = round(max(60.0, 85.0 - progress * 20.0 + random.uniform(-3, 3)), 1)
                    isolation = "Often isolated" if progress > 0.4 else "Sometimes isolated"
                    note = "Haven't spoken to anyone in my cohort this week." if progress > 0.5 else None

                elif profile == "moderate_stress":
                    sleep = round(random.uniform(5.2, 6.8), 1)
                    study = round(random.uniform(7.0, 9.5), 1)
                    mood = random.choice([2, 3, 3, 4])
                    attendance = round(random.uniform(75.0, 88.0), 1)
                    isolation = random.choice(["Connected", "Sometimes isolated", "Sometimes isolated"])
                    note = "Upcoming midterms are stressful." if random.random() < 0.3 else None

                else: # healthy baseline
                    sleep = round(random.uniform(7.0, 8.5), 1)
                    study = round(random.uniform(5.0, 7.0), 1)
                    mood = random.choice([4, 4, 5, 3])
                    attendance = round(random.uniform(85.0, 98.0), 1)
                    isolation = "Connected"
                    note = None

                # Create Checkin
                checkin = Checkin(
                    student_id=sid,
                    date=checkin_date,
                    mood=mood,
                    sleep_hours=sleep,
                    study_hours=study,
                    isolation_level=isolation,
                    attendance_pct=attendance,
                    journal_note=note,
                    is_offline_sync=False,
                    created_at=datetime.datetime.utcnow() - datetime.timedelta(days=day_offset)
                )
                db.add(checkin)
                db.flush()

                # Evaluate Risk
                checkin_dict = {
                    "mood": mood,
                    "sleep_hours": sleep,
                    "study_hours": study,
                    "attendance_pct": attendance,
                    "isolation_level": isolation
                }
                eval_result = risk_engine.evaluate(checkin_dict, history_records)
                history_records.append(checkin_dict)

                # Save RiskScore
                risk_obj = RiskScore(
                    student_id=sid,
                    checkin_id=checkin.id,
                    score=eval_result["score"],
                    level=eval_result["level"],
                    factors=json.dumps(eval_result["factors"]),
                    calculated_at=checkin.created_at
                )
                db.add(risk_obj)

                # For the latest day (day_offset == 0), if High or Medium risk, create an Alert
                if day_offset == 0 and eval_result["score"] >= 45.0:
                    trend = "declining" if profile in ["burnout_trajectory", "severe_isolation"] else "stable"
                    suggested_action = (
                        "Consider a supportive check-in or peer outreach." 
                        if eval_result["score"] >= 68.0 else "Monitor trend and share self-care guide."
                    )
                    status = "pending"
                    
                    alert = Alert(
                        student_id=sid,
                        risk_score=eval_result["score"],
                        risk_level=eval_result["level"],
                        top_factors=json.dumps(eval_result["factors"][:3]),
                        trend=trend,
                        status=status,
                        suggested_action=suggested_action,
                        notes="Generated by automated early-warning heuristic."
                    )
                    db.add(alert)
                    created_alerts_count += 1

        db.commit()
        print(f"Seed completed: {len(all_students_meta)} students, 14 days checkins, {created_alerts_count} alerts generated.")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
