import datetime
import json
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(String, primary_key=True, index=True) # e.g. CG-1042
    department = Column(String, default="Engineering")
    year = Column(Integer, default=2)
    opt_in = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    checkins = relationship("Checkin", back_populates="student", cascade="all, delete-orphan")
    risk_scores = relationship("RiskScore", back_populates="student", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="student", cascade="all, delete-orphan")

class Checkin(Base):
    __tablename__ = "checkins"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    student_id = Column(String, ForeignKey("students.id"), index=True)
    date = Column(String, index=True) # YYYY-MM-DD
    mood = Column(Integer) # 1 (Very Low) - 5 (Great)
    sleep_hours = Column(Float)
    study_hours = Column(Float)
    isolation_level = Column(String) # "Connected", "Sometimes isolated", "Often isolated"
    attendance_pct = Column(Float) # 0.0 - 100.0
    journal_note = Column(Text, nullable=True)
    is_offline_sync = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("Student", back_populates="checkins")
    risk_score = relationship("RiskScore", back_populates="checkin", uselist=False)

class RiskScore(Base):
    __tablename__ = "risk_scores"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    student_id = Column(String, ForeignKey("students.id"), index=True)
    checkin_id = Column(Integer, ForeignKey("checkins.id"), nullable=True)
    score = Column(Float) # 0 - 100
    level = Column(String) # "Low", "Medium", "High"
    factors = Column(Text) # JSON string list
    calculated_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("Student", back_populates="risk_scores")
    checkin = relationship("Checkin", back_populates="risk_score")

    def get_factors(self):
        try:
            return json.loads(self.factors) if self.factors else []
        except Exception:
            return []

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    student_id = Column(String, ForeignKey("students.id"), index=True)
    risk_score = Column(Float)
    risk_level = Column(String) # "Low", "Medium", "High"
    top_factors = Column(Text) # JSON string list
    trend = Column(String, default="stable") # "improving", "stable", "declining"
    status = Column(String, default="pending") # "pending", "reviewed", "counsellor_requested", "dismissed"
    suggested_action = Column(String, default="Consider a supportive check-in.")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    student = relationship("Student", back_populates="alerts")

    def get_top_factors(self):
        try:
            return json.loads(self.top_factors) if self.top_factors else []
        except Exception:
            return []

class SupportResource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category = Column(String) # "Counsellor", "Academic", "Sleep", "Stress", "Peer", "Emergency"
    title = Column(String)
    description = Column(Text)
    contact_info = Column(String)
    availability = Column(String)
    is_emergency = Column(Boolean, default=False)

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    session_id = Column(String, index=True)
    sender = Column(String) # "user" or "bot"
    message = Column(Text)
    is_crisis = Column(Boolean, default=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
