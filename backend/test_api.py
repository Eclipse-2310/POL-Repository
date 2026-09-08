"""
Test script to verify all CampusGuard backend endpoints via FastAPI TestClient
"""
import sys
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_all():
    print("Testing /api/health...")
    r = client.get("/api/health")
    assert r.status_code == 200, f"Health failed: {r.text}"
    print("  -> Health OK:", r.json()["status"])

    print("Testing /api/resources...")
    r = client.get("/api/resources")
    assert r.status_code == 200
    resources = r.json()
    assert len(resources) > 0
    print(f"  -> Resources OK: found {len(resources)} items")

    print("Testing /api/admin/overview...")
    r = client.get("/api/admin/overview")
    assert r.status_code == 200
    ov = r.json()
    assert "risk_distribution" in ov
    assert "trends_14d" in ov
    print("  -> Admin overview OK:", ov["total_active_students"], "students")

    print("Testing /api/admin/alerts...")
    r = client.get("/api/admin/alerts")
    assert r.status_code == 200
    alerts = r.json()
    assert len(alerts) > 0
    print(f"  -> Alerts OK: found {len(alerts)} alerts, top alert: {alerts[0]['student_id']}")

    test_alert_id = alerts[0]["id"]
    print(f"Testing /api/admin/alerts/{test_alert_id}/action...")
    r = client.post(f"/api/admin/alerts/{test_alert_id}/action", json={"action": "counsellor_requested", "notes": "Checked in via test"})
    assert r.status_code == 200
    print("  -> Alert action OK:", r.json())

    top_student_id = alerts[0]["student_id"]
    print(f"Testing /api/admin/student/{top_student_id}...")
    r = client.get(f"/api/admin/student/{top_student_id}")
    assert r.status_code == 200
    detail = r.json()
    assert detail["student_id"] == top_student_id
    assert len(detail["history_7d"]) > 0
    print(f"  -> Student detail OK: {detail['current_risk_level']} risk, {len(detail['history_7d'])} days history")

    print("Testing /api/admin/social-graph...")
    r = client.get("/api/admin/social-graph")
    assert r.status_code == 200
    graph = r.json()
    assert len(graph["nodes"]) > 0
    assert len(graph["edges"]) > 0
    print(f"  -> Social graph OK: {len(graph['nodes'])} nodes, {len(graph['edges'])} edges")

    print("Testing /api/student/CG-1042/wellbeing...")
    r = client.get("/api/student/CG-1042/wellbeing")
    assert r.status_code == 200
    wb = r.json()
    print("  -> Student wellbeing OK:", wb["today_wellbeing"]["status_label"])

    print("Testing POST /api/checkins (high stress checkin)...")
    checkin_payload = {
        "student_id": "CG-9999",
        "mood": 1,
        "sleep_hours": 3.5,
        "study_hours": 12.0,
        "isolation_level": "Often isolated",
        "attendance_pct": 55.0,
        "journal_note": "Feeling totally overwhelmed by deadlines."
    }
    r = client.post("/api/checkins", json=checkin_payload)
    assert r.status_code == 200
    c_res = r.json()
    assert c_res["level"] == "High"
    assert c_res["status_label"] == "Support Recommended"
    print(f"  -> Checkin OK: Risk Score={c_res['score']}, Level={c_res['level']}, Factors={c_res['factors']}")

    print("Testing POST /api/chat (supportive)...")
    r = client.post("/api/chat", json={"message": "I'm feeling really stressed about my exams tomorrow."})
    assert r.status_code == 200
    chat_res = r.json()
    assert not chat_res["is_crisis"]
    print("  -> Chat regular OK:", chat_res["reply"][:60] + "...")

    print("Testing POST /api/chat (crisis detection)...")
    r = client.post("/api/chat", json={"message": "I want to end my life I can't take this anymore"})
    assert r.status_code == 200
    crisis_res = r.json()
    assert crisis_res["is_crisis"]
    assert crisis_res["emergency_contacts"] is not None
    print("  -> Chat crisis triage OK: Tele-MANAS/KIRAN triggered properly.")

    print("\nALL BACKEND API AND ML TESTS PASSED PERFECTLY!")

if __name__ == "__main__":
    test_all()
