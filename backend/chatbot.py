"""
CampusGuard Support Chatbot
Empathetic, non-clinical conversational support with immediate safety triage.
DISCLAIMER: This chatbot provides supportive listening and coping strategies,
not clinical therapy or medical diagnosis.
"""

import re
from typing import Dict, Any, List

# Strict detection list for crisis / self-harm / suicide ideation
CRISIS_KEYWORDS = [
    r"\bsuicid(e|al)\b",
    r"\bkill\s+(myself|me)\b",
    r"\bend\s+(my\s+life|it\s+all)\b",
    r"\bwant\s+to\s+die\b",
    r"\bharm\s+(myself|me)\b",
    r"\bself[\s-]harm\b",
    r"\bcan'?t\s+go\s+on\b",
    r"\bno\s+reason\s+to\s+live\b",
    r"\bcut\s+myself\b",
    r"\bhurt\s+myself\b"
]

EMERGENCY_RESOURCES = [
    {
        "name": "Tele-MANAS (Govt of India 24x7 Helpline)",
        "phone": "14416 / 1800 891 4416",
        "type": "National Mental Health Support",
        "description": "Toll-free, 24x7 multi-lingual mental health counselling support across all Indian states."
    },
    {
        "name": "KIRAN National Mental Health Helpline",
        "phone": "1800-599-0019",
        "type": "Toll-Free Crisis Support",
        "description": "24/7 national helpline providing early screening, first aid, psychological support, and distress management."
    },
    {
        "name": "Campus Medical & Counselling Cell",
        "phone": "+91 800-CAMPUS-CARE",
        "type": "Campus Health Center",
        "description": "Confidential walk-in student wellness unit at Campus Health Wing, Block B."
    },
    {
        "name": "National Emergency Services",
        "phone": "112",
        "type": "Immediate Emergency",
        "description": "Unified national emergency number for immediate physical assistance."
    }
]

def check_crisis_intent(text: str) -> bool:
    """Detects whether text contains explicit markers of immediate crisis or self-harm."""
    text_lower = text.lower()
    for pattern in CRISIS_KEYWORDS:
        if re.search(pattern, text_lower):
            return True
    return False

def generate_supportive_response(message: str) -> Dict[str, Any]:
    """
    Generates an empathetic, constructive, non-diagnostic response.
    Triggers safety resources if crisis indicators are detected.
    """
    # 1. Immediate Crisis Check
    if check_crisis_intent(message):
        return {
            "reply": (
                "Please know that you are not alone and your life matters deeply. "
                "I cannot provide medical or emergency help, but there are compassionate, "
                "trained counsellors available right now to listen and support you in safety. "
                "Please reach out to one of the trusted emergency contacts below immediately, "
                "or contact someone you trust."
            ),
            "is_crisis": True,
            "emergency_contacts": EMERGENCY_RESOURCES,
            "suggested_resources": [
                "Call Tele-MANAS (14416)",
                "Contact Campus Health Center",
                "Reach out to a trusted peer or faculty mentor"
            ]
        }

    msg = message.lower().strip()

    # 2. Exam / Academic Stress
    if any(k in msg for k in ["exam", "test", "assignment", "study", "deadline", "grade", "fail", "academics"]):
        reply = (
            "Academic pressure can feel intense and all-consuming. "
            "Let's break things down into one manageable step together: "
            "Consider pausing for 10 minutes away from your screen, taking 3 deep breaths, "
            "and writing down just one high-priority task you can tackle in a short 25-minute Pomodoro window. "
            "Would you like guidance on speaking with your academic advisor or study skills counselor?"
        )
        return {
            "reply": reply,
            "is_crisis": False,
            "suggested_resources": [
                "Academic Skills Center",
                "Peer Tutoring Circles",
                "Pomodoro Focus Guide"
            ]
        }

    # 3. Loneliness / Social Isolation
    if any(k in msg for k in ["lonely", "alone", "isolated", "no friends", "left out", "disconnected", "nobody"]):
        reply = (
            "Feeling disconnected can be very difficult, but your feelings are completely valid. "
            "Many students experience periods of isolation, even on a bustling campus. "
            "If you feel comfortable, consider sending a short casual text to one friend, roommate, or family member, "
            "or visiting the campus student lounge or library study circle today. "
            "Even small moments of shared presence can help."
        )
        return {
            "reply": reply,
            "is_crisis": False,
            "suggested_resources": [
                "Campus Peer Support Groups",
                "Student Activity Clubs",
                "Coffee & Connect Sessions"
            ]
        }

    # 4. Sleep Deprivation / Insomnia
    if any(k in msg for k in ["sleep", "tired", "exhausted", "insomnia", "can't sleep", "fatigue", "wake up"]):
        reply = (
            "Consistently low sleep impacts your mood, concentration, and physical health. "
            "Tonight, try setting a wind-down buffer 45 minutes before sleep: "
            "dim bright screen lights, switch to reading or relaxing audio, and keep your sleeping space cool and dark. "
            "If daytime fatigue persists, our campus wellness center offers free consultations on sleep hygiene."
        )
        return {
            "reply": reply,
            "is_crisis": False,
            "suggested_resources": [
                "Sleep Hygiene Quick Guide",
                "Guided Wind-Down Audio",
                "Campus Wellness Consultation"
            ]
        }

    # 5. Overwhelm / Anxiety / Panic
    if any(k in msg for k in ["overwhelmed", "anxious", "anxiety", "panic", "stress", "stressed", "burnout"]):
        reply = (
            "When everything feels like too much at once, your nervous system is asking for a pause. "
            "Let's try the 5-4-3-2-1 grounding technique right now: "
            "Notice 5 things you can see around you, 4 things you can physically touch, 3 sounds you can hear, "
            "2 things you can smell, and take 1 slow, deep exhale. "
            "You don't have to solve everything today—just this current hour."
        )
        return {
            "reply": reply,
            "is_crisis": False,
            "suggested_resources": [
                "Grounding & Breathwork Tools",
                "Confidential Counsellor Booking",
                "Campus Quiet Reflection Rooms"
            ]
        }

    # 6. Default supportive greeting / reflection
    reply = (
        "Thank you for sharing. CampusGuard is here to listen and provide supportive, confidential space "
        "whenever you're navigating workload, sleep changes, or feeling disconnected. "
        "How has your energy and focus felt over the past few days?"
    )
    return {
        "reply": reply,
        "is_crisis": False,
        "suggested_resources": [
            "Daily Wellbeing Check-in",
            "Campus Wellness Resources",
            "Talk to a Peer Supporter"
        ]
    }
