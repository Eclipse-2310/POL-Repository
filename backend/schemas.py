from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class CheckinCreate(BaseModel):
    student_id: str = Field(default="CG-1042", description="Anonymous student identifier")
    mood: int = Field(ge=1, le=5, description="Mood rating from 1 (Very Low) to 5 (Great)")
    sleep_hours: float = Field(ge=0.0, le=24.0, description="Hours of sleep in last 24h")
    study_hours: float = Field(ge=0.0, le=24.0, description="Hours spent studying/working")
    isolation_level: str = Field(description="'Connected', 'Sometimes isolated', or 'Often isolated'")
    attendance_pct: float = Field(ge=0.0, le=100.0, description="Recent class attendance percentage")
    journal_note: Optional[str] = Field(default=None, description="Voluntary reflection note")
    is_offline_sync: Optional[bool] = False

class RiskScoreResponse(BaseModel):
    score: float
    level: str # "Low", "Medium", "High"
    status_label: str # "Stable", "Needs Attention", "Support Recommended"
    factors: List[str]
    supportive_recommendation: str
    is_emergency_triggered: bool = False

class CheckinHistoryItem(BaseModel):
    date: str
    mood: int
    sleep_hours: float
    study_hours: float
    attendance_pct: float
    isolation_level: str
    wellbeing_score: float

class StudentWellbeingResponse(BaseModel):
    student_id: str
    today_wellbeing: Dict[str, Any]
    history_7d: List[CheckinHistoryItem]
    insights: List[str]
    opt_in: bool

class RiskDistribution(BaseModel):
    low: int
    medium: int
    high: int
    low_pct: float
    medium_pct: float
    high_pct: float

class CampusTrendPoint(BaseModel):
    date: str
    avg_mood: float
    avg_sleep: float
    avg_study: float
    avg_attendance: float
    avg_wellbeing: float

class AdminOverviewResponse(BaseModel):
    total_active_students: int
    checkins_today: int
    students_needing_attention: int
    high_priority_alerts: int
    risk_distribution: RiskDistribution
    trends_14d: List[CampusTrendPoint]

class AlertItem(BaseModel):
    id: int
    student_id: str
    risk_score: float
    risk_level: str
    top_factors: List[str]
    trend: str # "improving", "stable", "declining"
    status: str # "pending", "reviewed", "counsellor_requested", "dismissed"
    suggested_action: str
    notes: Optional[str]
    last_checkin: str
    created_at: str

class AlertActionRequest(BaseModel):
    action: str = Field(description="'reviewed', 'counsellor_requested', or 'dismissed'")
    notes: Optional[str] = None

class StudentDetailForAdmin(BaseModel):
    student_id: str
    department: str
    year: int
    current_risk_score: float
    current_risk_level: str
    top_factors: List[str]
    trend: str
    suggested_action: str
    status: str
    history_7d: List[CheckinHistoryItem]

class ChatRequest(BaseModel):
    session_id: Optional[str] = "demo-session"
    message: str

class EmergencyContact(BaseModel):
    name: str
    phone: str
    type: str
    description: str

class ChatResponse(BaseModel):
    reply: str
    is_crisis: bool
    suggested_resources: List[str] = []
    emergency_contacts: Optional[List[EmergencyContact]] = None

class ResourceItem(BaseModel):
    id: int
    category: str
    title: str
    description: str
    contact_info: str
    availability: str
    is_emergency: bool
