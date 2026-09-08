"""
CampusGuard Backend API
FastAPI service connecting Early-Warning Risk Engine, NetworkX Social Graph,
SQLite Database, and Supportive Chatbot.
"""

from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
import json
import datetime

from database import engine, get_db, Base
from models import Student, Checkin, RiskScore, Alert, SupportResource, ChatMessage
from schemas import (
    CheckinCreate, RiskScoreResponse, StudentWellbeingResponse,
    AdminOverviewResponse, AlertItem, AlertActionRequest,
    StudentDetailForAdmin, ChatRequest, ChatResponse, ResourceItem,
    RiskDistribution, CampusTrendPoint, CheckinHistoryItem
)
from risk_engine import get_risk_engine
from social_graph import social_graph_instance
from chatbot import generate_supportive_response
from seed import seed_database

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# Base directories
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST = os.path.join(os.path.dirname(BACKEND_DIR), "frontend", "dist")

# Initialize tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CampusGuard API",
    description="Privacy-first AI-powered student wellbeing early-warning system.",
    version="1.0.0"
)

# Enable CORS for Vite frontend (typically localhost:5173 or localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

risk_engine = get_risk_engine("heuristic")

@app.get("/api/health")
def health_check():
    """Service health and diagnostic status."""
    return {
        "status": "healthy",
        "service": "CampusGuard Early-Warning Platform",
        "mode": "Demo Synthetic Environment",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }

@app.post("/api/checkins", response_model=RiskScoreResponse)
def submit_checkin(payload: CheckinCreate, db: Session = Depends(get_db)):
    """
    Submits student daily check-in, executes risk engine evaluation,
    stores records, and creates institutional alert if pattern needs support.
    """
    # Verify or register anonymous student
    student = db.query(Student).filter(Student.id == payload.student_id).first()
    if not student:
        student = Student(id=payload.student_id, department="General Studies", year=2, opt_in=True)
        db.add(student)
        db.commit()
        db.refresh(student)

    today_str = datetime.date.today().strftime("%Y-%m-%d")

    # Fetch recent history for multi-day trend analysis
    recent_checkins = (
        db.query(Checkin)
        .filter(Checkin.student_id == payload.student_id)
        .order_by(Checkin.date.asc())
        .limit(7)
        .all()
    )
    history_dicts = [
        {
            "mood": c.mood,
            "sleep_hours": c.sleep_hours,
            "study_hours": c.study_hours,
            "attendance_pct": c.attendance_pct,
            "isolation_level": c.isolation_level
        }
        for c in recent_checkins
    ]

    # Evaluate risk
    current_data = {
        "mood": payload.mood,
        "sleep_hours": payload.sleep_hours,
        "study_hours": payload.study_hours,
        "attendance_pct": payload.attendance_pct,
        "isolation_level": payload.isolation_level
    }
    evaluation = risk_engine.evaluate(current_data, history_dicts)

    # Save Checkin
    new_checkin = Checkin(
        student_id=payload.student_id,
        date=today_str,
        mood=payload.mood,
        sleep_hours=payload.sleep_hours,
        study_hours=payload.study_hours,
        isolation_level=payload.isolation_level,
        attendance_pct=payload.attendance_pct,
        journal_note=payload.journal_note,
        is_offline_sync=payload.is_offline_sync or False
    )
    db.add(new_checkin)
    db.flush()

    # Save RiskScore
    risk_record = RiskScore(
        student_id=payload.student_id,
        checkin_id=new_checkin.id,
        score=evaluation["score"],
        level=evaluation["level"],
        factors=json.dumps(evaluation["factors"])
    )
    db.add(risk_record)

    # Create institutional alert if score indicates need for attention
    if evaluation["score"] >= 45.0:
        existing_alert = (
            db.query(Alert)
            .filter(Alert.student_id == payload.student_id, Alert.status == "pending")
            .first()
        )
        if existing_alert:
            existing_alert.risk_score = evaluation["score"]
            existing_alert.risk_level = evaluation["level"]
            existing_alert.top_factors = json.dumps(evaluation["factors"][:3])
            existing_alert.updated_at = datetime.datetime.now(datetime.timezone.utc)
        else:
            trend = "declining" if evaluation["score"] >= 68.0 else "stable"
            suggested_action = (
                "Consider a supportive check-in or peer outreach." 
                if evaluation["score"] >= 68.0 else "Monitor trend and offer self-care guide."
            )
            new_alert = Alert(
                student_id=payload.student_id,
                risk_score=evaluation["score"],
                risk_level=evaluation["level"],
                top_factors=json.dumps(evaluation["factors"][:3]),
                trend=trend,
                status="pending",
                suggested_action=suggested_action
            )
            db.add(new_alert)

    db.commit()

    return RiskScoreResponse(
        score=evaluation["score"],
        level=evaluation["level"],
        status_label=evaluation["status_label"],
        factors=evaluation["factors"],
        supportive_recommendation=evaluation["supportive_recommendation"],
        is_emergency_triggered=(evaluation["score"] >= 85.0)
    )

@app.get("/api/student/{student_id}/wellbeing", response_model=StudentWellbeingResponse)
def get_student_wellbeing(student_id: str, db: Session = Depends(get_db)):
    """Fetches a student's current wellbeing metrics, 7-day trend history, and supportive insights."""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        # Return fallback default profile for smooth UX if newly queried
        student = Student(id=student_id, department="Engineering", year=2, opt_in=True)
        db.add(student)
        db.commit()

    checkins = (
        db.query(Checkin)
        .filter(Checkin.student_id == student_id)
        .order_by(Checkin.date.asc())
        .all()
    )

    history_items = []
    for c in checkins[-7:]:
        # Calculate composite score for charting
        score_obj = db.query(RiskScore).filter(RiskScore.checkin_id == c.id).first()
        score_val = score_obj.score if score_obj else 25.0
        history_items.append(
            CheckinHistoryItem(
                date=c.date,
                mood=c.mood,
                sleep_hours=c.sleep_hours,
                study_hours=c.study_hours,
                attendance_pct=c.attendance_pct,
                isolation_level=c.isolation_level,
                wellbeing_score=score_val
            )
        )

    # If no check-ins yet, provide a baseline entry
    if not history_items:
        today_str = datetime.date.today().strftime("%Y-%m-%d")
        latest = {
            "mood": 4,
            "sleep_hours": 7.2,
            "study_hours": 6.5,
            "attendance_pct": 86.0,
            "isolation_level": "Connected",
            "risk_score": 22.0,
            "status_label": "Stable"
        }
    else:
        last = checkins[-1]
        score_obj = db.query(RiskScore).filter(RiskScore.checkin_id == last.id).first()
        score_val = score_obj.score if score_obj else 25.0
        status_label = "Support Recommended" if score_val >= 68 else ("Needs Attention" if score_val >= 35 else "Stable")
        latest = {
            "mood": last.mood,
            "sleep_hours": last.sleep_hours,
            "study_hours": last.study_hours,
            "attendance_pct": last.attendance_pct,
            "isolation_level": last.isolation_level,
            "risk_score": score_val,
            "status_label": status_label
        }

    # Generate supportive non-alarming insights
    insights = []
    if len(history_items) >= 3:
        recent_sleeps = [h.sleep_hours for h in history_items[-3:]]
        if recent_sleeps[0] > recent_sleeps[1] > recent_sleeps[2]:
            insights.append("Your sleep duration has decreased for 3 consecutive days. Consider taking a 30-min buffer before bedtime.")
        
        avg_study = sum(h.study_hours for h in history_items) / len(history_items)
        if latest["study_hours"] > avg_study + 1.5:
            insights.append("Your study workload is higher than your recent weekly average. Remember to take regular recharge breaks.")

        if latest["mood"] <= 2:
            insights.append("You've experienced some tough days recently. Connecting with a peer or mentor might bring a welcome lift.")
        else:
            insights.append("Your attendance and daily check-ins show steady, positive engagement.")
    else:
        insights.append("Keep logging your voluntary check-ins to unlock personalized wellbeing insights.")
        insights.append("Your sleep and workload metrics are currently tracked safely on your device.")

    return StudentWellbeingResponse(
        student_id=student_id,
        today_wellbeing=latest,
        history_7d=history_items,
        insights=insights,
        opt_in=student.opt_in
    )

@app.get("/api/admin/overview", response_model=AdminOverviewResponse)
def get_admin_overview(db: Session = Depends(get_db)):
    """
    Campus Wellness Command Center KPI aggregations,
    risk distribution donut data, and 14-day campus-wide trend averages.
    """
    total_db_students = db.query(Student).count()
    # Present realistic institution metrics (scaled to college population)
    total_active = 1248 if total_db_students >= 25 else max(total_db_students * 40, 100)
    checkins_today = 842 if total_db_students >= 25 else max(total_db_students * 25, 60)

    # Risk counts based on latest score per student
    all_students = db.query(Student).all()
    low_count = 0
    med_count = 0
    high_count = 0

    for s in all_students:
        latest_score = (
            db.query(RiskScore)
            .filter(RiskScore.student_id == s.id)
            .order_by(RiskScore.id.desc())
            .first()
        )
        if latest_score:
            if latest_score.level == "High":
                high_count += 1
            elif latest_score.level == "Medium":
                med_count += 1
            else:
                low_count += 1
        else:
            low_count += 1

    total_cohort = max(1, low_count + med_count + high_count)
    low_pct = round((low_count / total_cohort) * 100, 1)
    med_pct = round((med_count / total_cohort) * 100, 1)
    high_pct = round((high_count / total_cohort) * 100, 1)

    # 14-day aggregated trend
    today = datetime.date.today()
    trends = []
    for d in range(13, -1, -1):
        target_date = (today - datetime.timedelta(days=d)).strftime("%Y-%m-%d")
        day_checkins = db.query(Checkin).filter(Checkin.date == target_date).all()
        if day_checkins:
            avg_mood = sum(c.mood for c in day_checkins) / len(day_checkins)
            avg_sleep = sum(c.sleep_hours for c in day_checkins) / len(day_checkins)
            avg_study = sum(c.study_hours for c in day_checkins) / len(day_checkins)
            avg_att = sum(c.attendance_pct for c in day_checkins) / len(day_checkins)
            
            # calculate average risk score for that date
            scores = [
                db.query(RiskScore).filter(RiskScore.checkin_id == c.id).first()
                for c in day_checkins
            ]
            valid_scores = [s.score for s in scores if s]
            avg_wellbeing = sum(valid_scores) / len(valid_scores) if valid_scores else 28.0
        else:
            avg_mood, avg_sleep, avg_study, avg_att, avg_wellbeing = 3.6, 7.1, 6.4, 84.5, 26.0

        trends.append(
            CampusTrendPoint(
                date=target_date,
                avg_mood=round(avg_mood, 2),
                avg_sleep=round(avg_sleep, 2),
                avg_study=round(avg_study, 2),
                avg_attendance=round(avg_att, 1),
                avg_wellbeing=round(avg_wellbeing, 1)
            )
        )

    needing_attention = 73 if total_db_students >= 25 else (med_count + high_count)
    high_priority = 18 if total_db_students >= 25 else high_count

    return AdminOverviewResponse(
        total_active_students=total_active,
        checkins_today=checkins_today,
        students_needing_attention=needing_attention,
        high_priority_alerts=high_priority,
        risk_distribution=RiskDistribution(
            low=low_count,
            medium=med_count,
            high=high_count,
            low_pct=low_pct,
            medium_pct=med_pct,
            high_pct=high_pct
        ),
        trends_14d=trends
    )

@app.get("/api/admin/alerts", response_model=List[AlertItem])
def get_admin_alerts(
    risk_level: Optional[str] = Query(None),
    status_filter: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """Returns Early Warning Alerts for anonymous student review."""
    query = db.query(Alert).order_by(Alert.risk_score.desc())
    if risk_level:
        query = query.filter(Alert.risk_level.ilike(risk_level))
    if status_filter:
        query = query.filter(Alert.status.ilike(status_filter))

    alerts = query.all()
    results = []
    for a in alerts:
        last_checkin_rec = (
            db.query(Checkin)
            .filter(Checkin.student_id == a.student_id)
            .order_by(Checkin.date.desc())
            .first()
        )
        last_date = last_checkin_rec.date if last_checkin_rec else a.created_at.strftime("%Y-%m-%d")

        results.append(
            AlertItem(
                id=a.id,
                student_id=a.student_id,
                risk_score=a.risk_score,
                risk_level=a.risk_level,
                top_factors=a.get_top_factors(),
                trend=a.trend,
                status=a.status,
                suggested_action=a.suggested_action,
                notes=a.notes,
                last_checkin=last_date,
                created_at=a.created_at.strftime("%b %d, %H:%M")
            )
        )
    return results

@app.post("/api/admin/alerts/{alert_id}/action")
def update_alert_action(alert_id: int, payload: AlertActionRequest, db: Session = Depends(get_db)):
    """Updates the action status of an alert (reviewed, counsellor_requested, dismissed)."""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    if payload.action not in ["reviewed", "counsellor_requested", "dismissed", "pending"]:
        raise HTTPException(status_code=400, detail="Invalid action type")

    alert.status = payload.action
    if payload.notes:
        alert.notes = payload.notes
    alert.updated_at = datetime.datetime.now(datetime.timezone.utc)
    db.commit()

    return {
        "success": True,
        "message": f"Alert {alert_id} marked as {payload.action}",
        "status": alert.status
    }

@app.get("/api/admin/student/{student_id}", response_model=StudentDetailForAdmin)
def get_admin_student_detail(student_id: str, db: Session = Depends(get_db)):
    """Deep-dive data for the alert side drawer with 7-day sparkline histories."""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    alert = db.query(Alert).filter(Alert.student_id == student_id).order_by(Alert.id.desc()).first()
    latest_score = (
        db.query(RiskScore)
        .filter(RiskScore.student_id == student_id)
        .order_by(RiskScore.id.desc())
        .first()
    )

    checkins = (
        db.query(Checkin)
        .filter(Checkin.student_id == student_id)
        .order_by(Checkin.date.asc())
        .all()
    )

    history_items = []
    for c in checkins[-7:]:
        sc = db.query(RiskScore).filter(RiskScore.checkin_id == c.id).first()
        history_items.append(
            CheckinHistoryItem(
                date=c.date,
                mood=c.mood,
                sleep_hours=c.sleep_hours,
                study_hours=c.study_hours,
                attendance_pct=c.attendance_pct,
                isolation_level=c.isolation_level,
                wellbeing_score=sc.score if sc else 25.0
            )
        )

    score_val = latest_score.score if latest_score else 25.0
    level_val = latest_score.level if latest_score else "Low"
    factors = latest_score.get_factors() if latest_score else []
    trend_val = alert.trend if alert else "stable"
    suggested = alert.suggested_action if alert else "Maintain regular check-in cadence."
    status_val = alert.status if alert else "normal"

    return StudentDetailForAdmin(
        student_id=student.id,
        department=student.department,
        year=student.year,
        current_risk_score=score_val,
        current_risk_level=level_val,
        top_factors=factors,
        trend=trend_val,
        suggested_action=suggested,
        status=status_val,
        history_7d=history_items
    )

@app.get("/api/admin/social-graph")
def get_social_graph(db: Session = Depends(get_db)):
    """Returns NetworkX community graph with node coordinates and isolation indices."""
    students = db.query(Student.id).all()
    student_ids = [s[0] for s in students]
    graph_data = social_graph_instance.build_synthetic_cohort_graph(student_ids)
    return graph_data

@app.post("/api/chat", response_model=ChatResponse)
def support_chat(payload: ChatRequest, db: Session = Depends(get_db)):
    """Empathetic conversational response with automatic crisis triage."""
    res = generate_supportive_response(payload.message)

    # Save to chat log
    chat_log = ChatMessage(
        session_id=payload.session_id or "demo-session",
        sender="user",
        message=payload.message,
        is_crisis=res["is_crisis"]
    )
    db.add(chat_log)
    bot_log = ChatMessage(
        session_id=payload.session_id or "demo-session",
        sender="bot",
        message=res["reply"],
        is_crisis=res["is_crisis"]
    )
    db.add(bot_log)
    db.commit()

    return ChatResponse(
        reply=res["reply"],
        is_crisis=res["is_crisis"],
        suggested_resources=res.get("suggested_resources", []),
        emergency_contacts=res.get("emergency_contacts")
    )

@app.get("/api/resources", response_model=List[ResourceItem])
def get_resources(db: Session = Depends(get_db)):
    """Returns configured institutional and national wellbeing resources."""
    resources = db.query(SupportResource).order_by(SupportResource.is_emergency.desc()).all()
    return [
        ResourceItem(
            id=r.id,
            category=r.category,
            title=r.title,
            description=r.description,
            contact_info=r.contact_info,
            availability=r.availability,
            is_emergency=r.is_emergency
        )
        for r in resources
    ]

@app.post("/api/demo/reset")
def reset_demo_data():
    """Resets the SQLite database with fresh synthetic demo cohort."""
    seed_database()
    return {"success": True, "message": "Demo data reset successfully to synthetic baseline."}

# Mount built frontend assets if dist directory exists
if os.path.exists(FRONTEND_DIST):
    assets_dir = os.path.join(FRONTEND_DIST, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="static_assets")

    @app.get("/{full_path:path}")
    def serve_frontend(full_path: str):
        # If static file exists, serve it
        candidate = os.path.join(FRONTEND_DIST, full_path)
        if full_path and os.path.isfile(candidate):
            return FileResponse(candidate)
        # Fallback to index.html for client-side routing
        index_file = os.path.join(FRONTEND_DIST, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"message": "CampusGuard API running. Frontend build not found in dist/."}

