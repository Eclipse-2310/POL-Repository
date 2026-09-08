"""
CampusGuard Early-Warning Risk Engine
DISCLAIMER: Prototype early-warning heuristic — not a medical diagnostic model.
Purpose: Identify patterns associated with academic overload, poor sleep, declining
attendance, low mood, and social isolation to enable early supportive interventions.
"""

from abc import ABC, abstractmethod
from typing import Dict, List, Any, Optional

class BaseRiskEngine(ABC):
    """
    Service abstraction interface for wellbeing risk scoring.
    Allows hot-swapping heuristic rule engines with trained scikit-learn or XGBoost ML models.
    """
    @abstractmethod
    def evaluate(self, current: Dict[str, Any], history: Optional[List[Dict[str, Any]]] = None) -> Dict[str, Any]:
        """
        Calculates a risk score (0-100), risk level, status label, and contributing factors.
        """
        pass

class HeuristicRiskEngine(BaseRiskEngine):
    """
    Calibrated heuristic scoring engine based on institutional wellbeing guidelines.
    Transparent, explainable, and non-stigmatizing.
    """
    MODEL_NAME = "Prototype early-warning heuristic — not a medical diagnostic model."

    def evaluate(self, current: Dict[str, Any], history: Optional[List[Dict[str, Any]]] = None) -> Dict[str, Any]:
        mood = int(current.get("mood", 3))
        sleep_hours = float(current.get("sleep_hours", 7.0))
        study_hours = float(current.get("study_hours", 6.0))
        attendance = float(current.get("attendance_pct", 85.0))
        isolation = str(current.get("isolation_level", "Connected")).strip()

        score = 0.0
        factors: List[str] = []

        # 1. Sleep Evaluation (Weight: ~25-35 pts)
        if sleep_hours < 4.5:
            score += 32.0
            factors.append("Severe sleep deprivation (< 4.5 hrs)")
        elif sleep_hours < 6.0:
            score += 20.0
            factors.append("Insufficient sleep (< 6.0 hrs)")
        elif sleep_hours < 7.0:
            score += 8.0
        elif sleep_hours > 11.0:
            score += 10.0
            factors.append("Irregular oversleeping (> 11 hrs)")

        # 2. Workload & Academic Stress (Weight: ~20-25 pts)
        if study_hours >= 11.0:
            score += 26.0
            factors.append("Extreme academic workload (11+ hrs/day)")
        elif study_hours >= 8.5:
            score += 18.0
            factors.append("High study workload (8.5+ hrs/day)")
        elif study_hours >= 7.0:
            score += 8.0

        # 3. Mood Assessment (Weight: ~25 pts)
        if mood == 1:
            score += 28.0
            factors.append("Very low self-reported mood")
        elif mood == 2:
            score += 18.0
            factors.append("Low self-reported mood")
        elif mood == 3:
            score += 5.0

        # 4. Social Isolation Signal (Weight: ~20 pts)
        if isolation.lower() == "often isolated":
            score += 22.0
            factors.append("Reported feeling frequently isolated")
        elif isolation.lower() == "sometimes isolated":
            score += 10.0
            factors.append("Occasional feelings of isolation")

        # 5. Class Attendance Trajectory (Weight: ~15 pts)
        if attendance < 65.0:
            score += 20.0
            factors.append(f"Significantly declining attendance ({attendance:.0f}%)")
        elif attendance < 75.0:
            score += 12.0
            factors.append(f"Below-threshold attendance ({attendance:.0f}%)")
        elif attendance < 85.0:
            score += 5.0

        # 6. Trend Trajectory from Multi-Day History (Bonus ~10 pts)
        if history and len(history) >= 3:
            recent_sleeps = [h.get("sleep_hours", 7.0) for h in history[-3:]]
            recent_moods = [h.get("mood", 3) for h in history[-3:]]
            
            # Consecutive sleep decline
            if recent_sleeps[0] > recent_sleeps[1] > recent_sleeps[2] and current.get("sleep_hours", 7.0) <= recent_sleeps[2]:
                score += 8.0
                factors.append("Consecutive sleep drop over multiple days")

            # Consecutive mood decline
            if recent_moods[0] > recent_moods[1] > recent_moods[2]:
                score += 8.0
                factors.append("Declining mood trajectory")

        # Clamp score to [0, 100]
        final_score = min(max(round(score, 1), 0.0), 100.0)

        # Categorize Level & Non-Pathologizing Status Label
        if final_score >= 68.0:
            level = "High"
            status_label = "Support Recommended"
            recommendation = (
                "Your recent pattern indicates significant stress and fatigue. "
                "Consider taking a dedicated pause today, reaching out to a trusted mentor, "
                "or booking a confidential campus wellness session."
            )
        elif final_score >= 35.0:
            level = "Medium"
            status_label = "Needs Attention"
            recommendation = (
                "You're carrying noticeable workload or experiencing mild sleep deficits. "
                "Try pacing your assignments, getting an extra hour of rest tonight, and connecting with a friend."
            )
        else:
            level = "Low"
            status_label = "Stable"
            recommendation = (
                "Your wellbeing metrics reflect a healthy and sustainable balance. "
                "Keep maintaining your sleep routine and supportive connections!"
            )

        return {
            "score": final_score,
            "level": level,
            "status_label": status_label,
            "factors": factors if factors else ["Healthy routine maintained"],
            "supportive_recommendation": recommendation,
            "model_meta": self.MODEL_NAME
        }

class MLRiskEngine(BaseRiskEngine):
    """
    Placeholder service implementation for future scikit-learn / XGBoost model integration.
    Maintains exact same interface for zero-friction swapping.
    """
    def __init__(self, model_path: Optional[str] = None):
        self.model_path = model_path

    def evaluate(self, current: Dict[str, Any], history: Optional[List[Dict[str, Any]]] = None) -> Dict[str, Any]:
        # Falls back to heuristic engine until a custom trained weights file is provided
        fallback = HeuristicRiskEngine()
        res = fallback.evaluate(current, history)
        res["model_meta"] = "CampusGuard ML Pipeline (Trained Ensemble - Fallback Heuristic)"
        return res

# Default singleton instance
risk_engine_instance = HeuristicRiskEngine()

def get_risk_engine(engine_type: str = "heuristic") -> BaseRiskEngine:
    if engine_type == "ml":
        return MLRiskEngine()
    return risk_engine_instance
