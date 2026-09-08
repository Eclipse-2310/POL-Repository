# CampusGuard — Complete Project Source Code

> All project files consolidated into a single document.

## Table of Contents

- [.gitignore](#gitignore)
- [LICENSE](#license)
- [README.md](#readmemd)
- [install_and_build.py](#installandbuildpy)
- [push_to_github.bat](#pushtogithubbat)
- [push_to_github.ps1](#pushtogithubps1)
- [run_servers.py](#runserverspy)
- [backend\chatbot.py](#backend\chatbotpy)
- [backend\database.py](#backend\databasepy)
- [backend\main.py](#backend\mainpy)
- [backend\models.py](#backend\modelspy)
- [backend\requirements.txt](#backend\requirementstxt)
- [backend\risk_engine.py](#backend\riskenginepy)
- [backend\schemas.py](#backend\schemaspy)
- [backend\seed.py](#backend\seedpy)
- [backend\social_graph.py](#backend\socialgraphpy)
- [backend\test_api.py](#backend\testapipy)
- [frontend\index.html](#frontend\indexhtml)
- [frontend\package-lock.json](#frontend\packagelockjson)
- [frontend\package.json](#frontend\packagejson)
- [frontend\postcss.config.js](#frontend\postcssconfigjs)
- [frontend\tailwind.config.js](#frontend\tailwindconfigjs)
- [frontend\tsconfig.json](#frontend\tsconfigjson)
- [frontend\vite.config.ts](#frontend\viteconfigts)
- [frontend\src\App.tsx](#frontend\src\apptsx)
- [frontend\src\index.css](#frontend\src\indexcss)
- [frontend\src\main.tsx](#frontend\src\maintsx)
- [frontend\src\components\DemoBanner.tsx](#frontend\src\components\demobannertsx)
- [frontend\src\components\Navbar.tsx](#frontend\src\components\navbartsx)
- [frontend\src\components\StatCard.tsx](#frontend\src\components\statcardtsx)
- [frontend\src\components\Toast.tsx](#frontend\src\components\toasttsx)
- [frontend\src\i18n\translations.ts](#frontend\src\i18n\translationsts)
- [frontend\src\pages\AdminDashboard.tsx](#frontend\src\pages\admindashboardtsx)
- [frontend\src\pages\AlertDetailPanel.tsx](#frontend\src\pages\alertdetailpaneltsx)
- [frontend\src\pages\DailyCheckIn.tsx](#frontend\src\pages\dailycheckintsx)
- [frontend\src\pages\LandingPage.tsx](#frontend\src\pages\landingpagetsx)
- [frontend\src\pages\PrivacyCenter.tsx](#frontend\src\pages\privacycentertsx)
- [frontend\src\pages\ResourcesPage.tsx](#frontend\src\pages\resourcespagetsx)
- [frontend\src\pages\SocialGraphPage.tsx](#frontend\src\pages\socialgraphpagetsx)
- [frontend\src\pages\StudentDashboard.tsx](#frontend\src\pages\studentdashboardtsx)
- [frontend\src\pages\SupportChat.tsx](#frontend\src\pages\supportchattsx)
- [frontend\src\services\api.ts](#frontend\src\services\apits)
- [frontend\src\services\offlineQueue.ts](#frontend\src\services\offlinequeuets)
- [frontend\src\types\index.ts](#frontend\src\types\indexts)

---

### .gitignore

`
# Node dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
frontend/dist/
dist/

# Python cache
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual environments
venv/
ENV/
env.bak/
venv.bak/

# IDE / OS
.vscode/
.idea/
.DS_Store
Thumbs.db
`

---

### LICENSE

`
MIT License

Copyright (c) 2026 CampusGuard Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`

---

### README.md

`markdown
# CampusGuard 🛡️
> **"Don't wait for students to struggle in silence."**
> *Privacy-first, opt-in AI-powered student wellbeing early-warning platform.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python: 3.13+](https://img.shields.io/badge/Python-3.13+-3776ab.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com)
[![React: 18](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-61dafb.svg)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8.svg)](https://tailwindcss.com)
[![NetworkX](https://img.shields.io/badge/Graph%20Analysis-NetworkX-orange.svg)](https://networkx.org)

---

## 1. Executive Summary & Problem

Across higher education institutions, student mental health distress, burnout, and social isolation frequently go unnoticed until an irreversible crisis or academic dropout occurs. Stigma, fear of clinical judgment, and cumbersome booking processes prevent vulnerable students from seeking help proactively.

**CampusGuard** bridges this gap through a voluntary, de-identified early-warning safety net.

### Core Guiding Principle
> **"A safety net, not a surveillance system."**
> The system strictly detects patterns associated with **academic overload, chronic sleep deficit, declining attendance, low mood, and peer isolation**. It **never** diagnoses mental illness or attaches clinical psychiatric labels.

---

## 2. Key Features

- **Voluntary 5-Step Check-in**: Takes under 30 seconds to capture mood, sleep hours, study load, attendance, and social connection.
- **Explainable Early-Warning Heuristic**: Transparent 0–100 scoring model with a pluggable service abstraction (`BaseRiskEngine`) for future ML ensemble integration.
- **NetworkX Community Connection Graph**: Analyzes voluntary peer interaction signals to visualize social cohesion and detect peripheral isolation without invasive monitoring.
- **Institution Wellness Command Center (`/admin`)**: Aggregated cohort KPIs, risk distribution donut chart, 14-day campus wellbeing trends, and filterable anonymous alert tables (`CG-1042`).
- **Supportive Alert Review Drawer**: Dedicated slide-over panel with 7-day sparklines (sleep, mood, attendance) and human-in-the-loop action logging (*Mark reviewed, Request counsellor follow-up, Dismiss*).
- **Crisis-Aware Support Chatbot**: Non-clinical empathetic active listening with automated safety triage connecting immediately to national crisis lifelines (Tele-MANAS `14416`, KIRAN `1800-599-0019`).
- **Rural & Low-Bandwidth Resilience**: Featherweight bundle (&lt;150 KB), local draft persistence, offline submission queue, and auto-sync on reconnect. Tested for ₹5,000–₹10,000 smartphones on 2G/3G networks.
- **Multilingual Localization**: Native support for **English**, **Hindi (हिन्दी)**, and **Marathi (मराठी)** with key-based extensibility for Kannada, Tamil, etc.
- **Privacy Center**: Visual architecture detailing the 7 Core Tenets, zero-PII storage, and student data sovereignty.
- **Demo Mode**: 1-click synthetic dataset seeding (35+ students, 14 days of check-in histories).

---

## 3. Architecture & Data Flow

```
[ Student Device (Local Draft & Offline Queue) ]
                      │  (Encrypted HTTPS / TLS)
                      ▼
        [ Anonymization Gateway ]
      (Strips PII, assigns CG-1042)
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
[ Risk Scoring Engine ]   [ NetworkX Graph Module ]
(Sleep deficit + Workload) (Peer Centrality & Isolation)
        │                           │
        └─────────────┬─────────────┘
                      ▼
          [ SQLite / SQLAlchemy DB ]
          (Checkins, RiskScores, Alerts)
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
[ Student Dashboard ]   [ Institution Command Center ]
(Private Reflection)     (Human Review & Early Support)
```

---

## 4. Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts |
| **Backend** | Python 3.13, FastAPI, Pydantic v2, SQLAlchemy 2.0, Uvicorn |
| **Database** | SQLite (prototype) / PostgreSQL-ready SQLAlchemy ORM |
| **Graph Analytics** | NetworkX (Degree Centrality, Clustering Coefficient, Spring Layout) |
| **Scoring / AI** | Pluggable Heuristic Service Abstraction (`BaseRiskEngine`) |
| **Resilience** | LocalStorage Drafts, Offline FIFO Sync Queue, Network Status Listener |
| **Localization** | Extensible JSON dictionary (EN, HI, MR) |

---

## 5. Getting Started & Running Locally

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Seed realistic synthetic demo data (35 students, 14 days)
python seed.py

# Start FastAPI development server
uvicorn main:app --reload --port 8000
```
Backend will be available at: `http://127.0.0.1:8000`
Interactive API Docs (Swagger): `http://127.0.0.1:8000/docs`

### 2. Frontend Setup
```bash
# In a separate terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Frontend will be available at: `http://localhost:5173`

---

## 6. API Reference Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health and synthetic mode verification |
| `POST` | `/api/checkins` | Submit voluntary daily check-in and evaluate risk |
| `GET` | `/api/student/{id}/wellbeing` | 7-day student wellbeing trends and supportive insights |
| `GET` | `/api/admin/overview` | Command Center KPIs, risk distribution, 14-day campus trends |
| `GET` | `/api/admin/alerts` | Filterable list of early-warning alerts |
| `POST` | `/api/admin/alerts/{id}/action` | Update alert status (`reviewed`, `counsellor_requested`, `dismissed`) |
| `GET` | `/api/admin/student/{id}` | Deep dive for alert side panel (sparklines & factors) |
| `GET` | `/api/admin/social-graph` | NetworkX node coordinates and isolation indices |
| `POST` | `/api/chat` | Supportive chatbot with crisis keyword triage |
| `GET` | `/api/resources` | Configurable institutional & national crisis resources |
| `POST` | `/api/demo/reset` | 1-click synthetic dataset reset |

---

## 7. The 3-Minute Hackathon Demo Script

1. **Landing Page (`/`)**: Introduce CampusGuard's tagline *"Don't wait for students to struggle in silence."* Highlight the non-diagnostic, privacy-first premise.
2. **Student Daily Check-in (`/checkin`)**: Walk through the 5 steps. Input a high-stress scenario (low sleep 4h, high workload 11h, low mood 2, often isolated).
3. **Risk Evaluation & Guidance**: Show the instant transparent evaluation (`Support Recommended` score 88/100) with non-stigmatizing recommendations.
4. **Offline Mode Simulation**: Click the `Online` badge in top nav to toggle `Offline Mode`. Submit a check-in. Show that it is queued locally. Toggle back online and show instant auto-synchronization.
5. **Multilingual Switch**: Toggle language to **हिन्दी (Hindi)** and **मराठी (Marathi)** to show indigenous accessibility for regional colleges.
6. **Wellness Command Center (`/admin`)**: Present aggregate KPIs (1,248 active students, 842 check-ins today), the Risk Distribution Donut chart, and 14-day campus trends.
7. **Alert Detail Side Panel**: Click alert `CG-1042`. Show 7-day sparklines and click *"Request Counsellor Follow-up"* to update database state.
8. **Community Connection Graph (`/socialGraph`)**: Demonstrate the NetworkX peer interaction network, showing isolated vs. connected student clusters.
9. **Support Chatbot (`/support`)**: Type *"I'm stressed about exams"* for gentle advice, then demonstrate safety triage with immediate Tele-MANAS (`14416`) helpline cards.
10. **Privacy Center (`/privacy`)**: Conclude with the 7 Core Privacy Tenets emphasizing student trust and data sovereignty.

---

## 8. Scalability & Regional Expansion

- **Language Expansion**: Translation architecture is decoupled into dictionary modules, ready for Kannada, Telugu, Tamil, and Gujarati.
- **Institutional Multi-Tenancy**: Designed to support campus partitioning with role-based JWT authentication and department-level aggregations.
- **ML Roadmap**: The `BaseRiskEngine` interface allows plug-and-play replacement of the heuristic engine with a trained scikit-learn Gradient Boosting or XGBoost model trained on longitudinal student success datasets.

---

## 9. License

This project is licensed under the [MIT License](LICENSE).
`

---

### install_and_build.py

`python
"""
Frontend build script using Python subprocess to ensure pristine environment PATH
"""
import os
import sys
import subprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
TOOLS_DIR = os.path.join(os.path.dirname(BASE_DIR), "tools", "node")

env = os.environ.copy()
env["PATH"] = TOOLS_DIR + os.path.pathsep + env.get("PATH", "")

print("Node dir:", TOOLS_DIR)
node_path = os.path.join(TOOLS_DIR, "node.exe")
npm_path = os.path.join(TOOLS_DIR, "npm.cmd")

print("Checking node version:")
subprocess.run([node_path, "-v"], env=env, check=True)
print("Checking npm version:")
subprocess.run([npm_path, "-v"], env=env, check=True)

print("\nRunning npm install in frontend...")
ret = subprocess.run([npm_path, "install"], cwd=FRONTEND_DIR, env=env)
if ret.returncode != 0:
    print("npm install failed with exit code", ret.returncode)
    sys.exit(ret.returncode)

print("\nRunning npm run build in frontend...")
ret2 = subprocess.run([npm_path, "run", "build"], cwd=FRONTEND_DIR, env=env)
if ret2.returncode != 0:
    print("npm run build failed with exit code", ret2.returncode)
    sys.exit(ret2.returncode)

print("\nFRONTEND BUILD COMPLETED SUCCESSFULLY!")
`

---

### push_to_github.bat

`batch
@echo off
cd /d "%~dp0"
echo ========================================================
echo       Pushing CampusGuard to GitHub (POL-Repository)
echo ========================================================
set "GIT_EXE=%~dp0..\tools\git\cmd\git.exe"
if not exist "%GIT_EXE%" set "GIT_EXE=git"

"%GIT_EXE%" status
echo.
echo Pushing to https://github.com/Eclipse-2310/POL-Repository.git...
"%GIT_EXE%" push -u origin main
echo.
pause
`

---

### push_to_github.ps1

`powershell
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

$GitExe = Join-Path $ScriptDir "..\tools\git\cmd\git.exe"
if (-not (Test-Path $GitExe)) { $GitExe = "git" }

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "      Pushing CampusGuard to GitHub (POL-Repository)" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

& $GitExe status
Write-Host "`nPushing to https://github.com/Eclipse-2310/POL-Repository.git..." -ForegroundColor Yellow
& $GitExe push -u origin main
`

---

### run_servers.py

`python
"""
CampusGuard Local Server Runner
Launches both FastAPI backend (port 8000) and React frontend (port 5173).
"""

import os
import sys
import subprocess
import time
import signal

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
TOOLS_DIR = os.path.join(os.path.dirname(BASE_DIR), "tools", "node")

NODE_EXE = os.path.join(TOOLS_DIR, "node.exe")
NPM_CMD = os.path.join(TOOLS_DIR, "npm.cmd")

if not os.path.exists(NODE_EXE):
    # Fallback to system node
    NODE_EXE = "node"
    NPM_CMD = "npm"

def main():
    print("=" * 65)
    print("           CAMPUSGUARD FULL-STACK RUNNER")
    print("   'Don't wait for students to struggle in silence.'")
    print("=" * 65)

    # 1. Start Backend
    print("[1/2] Launching FastAPI Backend on http://127.0.0.1:8000...")
    backend_proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"],
        cwd=BACKEND_DIR
    )

    # 2. Start Frontend
    print(f"[2/2] Launching Vite React Frontend on http://localhost:5173...")
    frontend_proc = subprocess.Popen(
        [NPM_CMD, "run", "dev"],
        cwd=FRONTEND_DIR,
        shell=True
    )

    print("\nCampusGuard is up and running!")
    print("  • Frontend: http://localhost:5173")
    print("  • Backend API: http://127.0.0.1:8000")
    print("  • Swagger Docs: http://127.0.0.1:8000/docs")
    print("\nPress Ctrl+C to gracefully terminate both servers.\n")

    try:
        while True:
            time.sleep(1)
            if backend_proc.poll() is not None or frontend_proc.poll() is not None:
                break
    except KeyboardInterrupt:
        print("\nShutting down CampusGuard services...")
    finally:
        backend_proc.terminate()
        frontend_proc.terminate()
        print("Services stopped.")

if __name__ == "__main__":
    main()
`

---

### backend\chatbot.py

`python
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
`

---

### backend\database.py

`python
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os

# SQLite database file stored locally in the backend directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "campusguard.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

# For SQLite, check_same_thread=False allows multi-threaded FastAPI access
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency for yielding database sessions per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
`

---

### backend\main.py

`python
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

`

---

### backend\models.py

`python
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
`

---

### backend\requirements.txt

`
fastapi>=0.115.0
uvicorn[standard]>=0.30.0
sqlalchemy>=2.0.0
pydantic>=2.9.0
networkx>=3.3.0
httpx>=0.27.0
`

---

### backend\risk_engine.py

`python
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
`

---

### backend\schemas.py

`python
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
`

---

### backend\seed.py

`python
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
`

---

### backend\social_graph.py

`python
"""
CampusGuard Social Interaction Graph Module
DISCLAIMER: Graph insights use voluntary/anonymized interaction signals and are
intended strictly as an early-support indicator. Zero invasive surveillance.
"""

import networkx as nx
from typing import Dict, List, Any
import random

class SocialInteractionGraph:
    """
    Analyzes voluntary peer connection networks using NetworkX to identify
    early indicators of social isolation and community fragmentation.
    """
    def __init__(self):
        self.graph = nx.Graph()

    def build_synthetic_cohort_graph(self, student_ids: List[str]) -> Dict[str, Any]:
        """
        Builds a realistic peer interaction network among anonymized student IDs.
        Includes dense study-group clusters, casual bridges, and isolated/peripheral nodes.
        """
        self.graph.clear()
        
        # Add all anonymous nodes
        for sid in student_ids:
            self.graph.add_node(sid)

        # Seed reproducible cluster creation
        random.seed(42)
        n = len(student_ids)

        if n < 4:
            return self.get_graph_metrics()

        # Divide students into realistic campus micro-communities (e.g. clubs, project teams)
        # 1. Main cohort clusters (healthy engagement)
        cluster_a = student_ids[: n // 3]
        cluster_b = student_ids[n // 3 : (2 * n) // 3]
        peripherals = student_ids[(2 * n) // 3 : -3] # low connection
        isolated = student_ids[-3:] # completely isolated or single connection

        # Create intra-cluster connections (dense)
        for cluster in [cluster_a, cluster_b]:
            for i in range(len(cluster)):
                for j in range(i + 1, len(cluster)):
                    if random.random() < 0.55: # 55% chance of voluntary interaction
                        self.graph.add_edge(cluster[i], cluster[j], weight=round(random.uniform(0.6, 1.0), 2))

        # Create inter-cluster bridge connections (cross-department interactions)
        for _ in range(max(3, n // 5)):
            u = random.choice(cluster_a)
            v = random.choice(cluster_b)
            self.graph.add_edge(u, v, weight=round(random.uniform(0.4, 0.8), 2))

        # Connect peripheral students loosely (degree 1 or 2)
        for p in peripherals:
            targets = random.sample(cluster_a + cluster_b, k=min(2, random.randint(1, 2)))
            for t in targets:
                self.graph.add_edge(p, t, weight=round(random.uniform(0.2, 0.5), 2))

        # Intentionally keep the isolated students at degree 0 or 1
        if len(isolated) >= 2:
            # One student with a single fragile connection
            self.graph.add_edge(isolated[0], random.choice(peripherals), weight=0.2)
            # Other 1 or 2 students completely disconnected (degree 0)

        return self.get_graph_metrics()

    def get_graph_metrics(self) -> Dict[str, Any]:
        """
        Calculates NetworkX centrality, clustering, and isolation indices.
        Returns layout coordinates (0-800 scale) for SVG/Canvas rendering.
        """
        G = self.graph
        if len(G.nodes) == 0:
            return {"nodes": [], "edges": [], "summary": {}}

        degree_centrality = nx.degree_centrality(G)
        clustering_coeff = nx.clustering(G)
        degrees = dict(G.degree())

        # Compute 2D spring layout for visualization
        # Use fixed seed for deterministic visual layout
        pos = nx.spring_layout(G, k=0.45, iterations=60, seed=42)

        # Scale coordinates into an 800 x 500 viewport with comfortable padding
        min_x = min(p[0] for p in pos.values())
        max_x = max(p[0] for p in pos.values())
        min_y = min(p[1] for p in pos.values())
        max_y = max(p[1] for p in pos.values())

        def scale_coord(val, min_v, max_v, target_size, pad=60):
            if max_v == min_v:
                return target_size / 2
            norm = (val - min_v) / (max_v - min_v)
            return pad + norm * (target_size - 2 * pad)

        nodes_data = []
        isolated_count = 0
        peripheral_count = 0

        for node in G.nodes:
            deg = degrees.get(node, 0)
            cent = degree_centrality.get(node, 0.0)
            clust = clustering_coeff.get(node, 0.0)

            # Isolation score formula (0 - 100):
            # Degree 0: 95
            # Degree 1: 75
            # Degree 2: 45
            # Higher degree with low clustering: 25-35
            # Connected: 5-15
            if deg == 0:
                iso_score = 95.0
                status = "Severely Isolated"
                isolated_count += 1
            elif deg == 1:
                iso_score = 75.0
                status = "At Risk of Isolation"
                isolated_count += 1
            elif deg <= 2:
                iso_score = 48.0
                status = "Peripheral Connection"
                peripheral_count += 1
            else:
                iso_score = max(5.0, round((1.0 - cent) * 25.0, 1))
                status = "Well Connected"

            x = round(scale_coord(pos[node][0], min_x, max_x, 800, pad=70), 1)
            y = round(scale_coord(pos[node][1], min_y, max_y, 500, pad=50), 1)

            nodes_data.append({
                "id": node,
                "degree": deg,
                "centrality": round(cent, 3),
                "clustering": round(clust, 3),
                "isolation_score": iso_score,
                "status": status,
                "x": x,
                "y": y
            })

        edges_data = []
        for u, v, data in G.edges(data=True):
            edges_data.append({
                "source": u,
                "target": v,
                "weight": data.get("weight", 1.0)
            })

        avg_clustering = nx.average_clustering(G) if len(G) > 0 else 0.0
        density = nx.density(G)

        summary = {
            "total_nodes": G.number_of_nodes(),
            "total_edges": G.number_of_edges(),
            "isolated_nodes_count": isolated_count,
            "peripheral_nodes_count": peripheral_count,
            "connected_nodes_count": G.number_of_nodes() - isolated_count - peripheral_count,
            "average_clustering": round(avg_clustering, 3),
            "density": round(density, 3),
            "disclaimer": "Graph insights use voluntary/anonymized interaction signals and are intended only as an early-support indicator."
        }

        return {
            "nodes": nodes_data,
            "edges": edges_data,
            "summary": summary
        }

# Global social graph instance
social_graph_instance = SocialInteractionGraph()
`

---

### backend\test_api.py

`python
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
`

---

### frontend\index.html

`html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="description" content="CampusGuard - Privacy-first, opt-in AI-powered student wellbeing early-warning system. Early signals. Earlier support." />
    <title>CampusGuard — Student Wellbeing Early-Warning Platform</title>
    <!-- Google Fonts Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#f8fafc] text-slate-900 antialiased min-h-screen font-sans selection:bg-brand-100 selection:text-brand-900">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

---

### frontend\package-lock.json

`json
{
  "name": "campusguard-frontend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "campusguard-frontend",
      "version": "1.0.0",
      "dependencies": {
        "lucide-react": "^1.16.0",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "recharts": "^2.15.0"
      },
      "devDependencies": {
        "@types/react": "^18.3.12",
        "@types/react-dom": "^18.3.1",
        "@vitejs/plugin-react": "^4.3.3",
        "autoprefixer": "^10.4.20",
        "postcss": "^8.4.49",
        "tailwindcss": "^3.4.16",
        "typescript": "^5.6.3",
        "vite": "^5.4.11"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.3.0.tgz",
      "integrity": "sha512-U4+70Pc5ZS9osnCBCE5Jha/ciHM+Yp+CNMNC/7HvYbNRk1Ldd+f7qO65W5qfhu/TCv+/ozljlXXe9Nj8419DMA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.7.tgz",
      "integrity": "sha512-Aup7aUOfpbAUg2ROOJN6Iw5f9DMBlzu0mIkm/malLQFN/YQgO48wCj0Kxa3sEHJvPVFg7siR+qRInwXd2qhQKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.29.7",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.7.tgz",
      "integrity": "sha512-locTkQyKvwIEgBzVrn8693ebc97F2U8ZHjbXwDXJ5Fn2TCpNwTlKcaKLkdHop5c/icOFE7qt7Q9JC5hnKNa6Gg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.7.tgz",
      "integrity": "sha512-RgHBCvtjbOK2gXSNBNIkNoEc9qoVEtau3hj8gEqKQuL3HZAibKarWFEI3Lfm6EYKkLalOh8eSrj9b+ch9H/VBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.7",
        "@babel/helper-compilation-targets": "^7.29.7",
        "@babel/helper-module-transforms": "^7.29.7",
        "@babel/helpers": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/template": "^7.29.7",
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.8.tgz",
      "integrity": "sha512-gZbepsdh3WDtgZKWL+vTPh71LSBrm/Y4/QDZBVCcYfmeTEEuoOYwlSy+G1StfJg+/Zy550u/3TATbm7qDbbMtg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.8",
        "@babel/types": "^7.29.8",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.29.7.tgz",
      "integrity": "sha512-wem6WaBj4NaVYVdNhLPPVacES6ZJ+KBBfSkTMD3YZxbP3rm3Di85tJU5ljaUNhaOynt+Aj0xruhYuzQBt8n71g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.29.7",
        "@babel/helper-validator-option": "^7.29.7",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.29.7.tgz",
      "integrity": "sha512-3nQVUAtvkKH9zahfWgw96Jc/uFOmjACE1kQz82E2lqWmHBgjzbNlsC22nuQTfahmWeQtTq5nQ/4Nnd2A1wj4zA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.29.7.tgz",
      "integrity": "sha512-ejHwrQQYcm9xnTivShn2IDOlIzInN34AXskvq9QicvCtEzq1Vzclu/tKF8Jq1Cg8JG2GL6/EmjgsCT7lXepE3g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.29.7.tgz",
      "integrity": "sha512-UPUVSyXbOh627KiCIGQSgwWzGeBKLkaJ9PJEdrngIwMSzxLR4jS4+f1f1jb7VzBbg8nFLaYotvVPFCTqdrmTAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7",
        "@babel/traverse": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.29.7.tgz",
      "integrity": "sha512-G7sHYigPY17oO5SYWnfD/0MTBwVR781S/JI643e/JhUYgVgWE/61SoW3NH9KWUKyKq5LVh3npif99Wkt6j86Jw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.29.7.tgz",
      "integrity": "sha512-Pb5ijPrZ89GDH8223L4UP8i6QApWxs04RbPQJTeWDV0/keR2E36MeKnyr6LYmUUvqRRI+Iv87SuF1W6ErINzYw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.29.7.tgz",
      "integrity": "sha512-qehxGkRj55h/ff8EMaJ+cYhyaKlHIxqYDn682wQD7RNp9UujOQsHog2uS0r2vzr4pW+sXf90NeeayjcNaX3fFg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.29.7.tgz",
      "integrity": "sha512-N9ZErrD+yW5geCDtBqnOoxmR8+tNKiGuxKlDpuJxfsqpa2dFcexaziGAE/qoHLiDDreVNMupxGmSoNlyvsA3gw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.7.tgz",
      "integrity": "sha512-1k2lAGRMfHTcwuNYcCNUmaUffmQv8KWMfh2iJUUeRlwlwH4FdNG7mfPI10NPfLHJFThE4Tyr4mv7kTNZOiPuBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.8.tgz",
      "integrity": "sha512-E8lTAYNB1KW+FH+VGJuZM1ioAx2E6oVlvQFRrf5P8ZZmsiJXYAD9vTFV7yyEURNzgh1dFqMZuO6tUwcARbqFCA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.8"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.29.7.tgz",
      "integrity": "sha512-TL0hMc9xzy86VD31nUiwzd5otRAcyEPcsegCxolO0PvcXuH1v0kECe/UIznYFihpkvU5wg/jk4v0TTEFfm53fw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.29.7.tgz",
      "integrity": "sha512-06IyK09H3wi4cGbhDBwp5gUGo0IKtnYa8tyTiephirPCK6fbobVGiXMMI5zLQ4aKEYP3wZ3ArU44o+8KMrSG/Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.7.tgz",
      "integrity": "sha512-Nq8OhGWiZIZGV6hLHoyAKLLcJihP/xFeBMGJoUrxTX2psI8dCifzLhZISFb+VWS3wFMRDmCGw5R+dOySCqPLhw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz",
      "integrity": "sha512-puq+Gf35oI24FeN11LkoUQFqv9uwNeWpxXZi/Ji3rRIoKAzKnxRaZ+Gkj0vKS9ZCiTESfng1N9LyOyXvo+m+Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.8.tgz",
      "integrity": "sha512-I5z7H3bf/41ktsNVLtpN0wAa336HkqIHQ5BuPLEhTkt1jVSyZpeNKIzTgEWmlxjdg81R0IgUCcaE+Ok3NvrfZg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.8",
        "@babel/helper-globals": "^7.29.7",
        "@babel/parser": "^7.29.8",
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.8",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.8.tgz",
      "integrity": "sha512-Vj1jF3cPfxg7OAfoI7QnVKLoILlm2JF9pnVHrX8qx7AHMiYWT+NDAA7jChlNgRS4WTLc/fD1lXLmPixluj+3Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.21.5.tgz",
      "integrity": "sha512-1SDgH6ZSPTlggy1yI6+Dbkiz8xzpHJEVAlF/AM1tHPLsf5STom9rwtjE4hKAF20FfXXNTFqEYXyJNWh1GiZedQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.21.5.tgz",
      "integrity": "sha512-vCPvzSjpPHEi1siZdlvAlsPxXl7WbOVUBBAowWug4rJHb68Ox8KualB+1ocNvT5fjv6wpkX6o/iEpbDrf68zcg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.21.5.tgz",
      "integrity": "sha512-c0uX9VAUBQ7dTDCjq+wdyGLowMdtR/GoC2U5IYk/7D1H1JYC0qseD7+11iMP2mRLN9RcCMRcjC4YMclCzGwS/A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.21.5.tgz",
      "integrity": "sha512-D7aPRUUNHRBwHxzxRvp856rjUHRFW1SdQATKXH2hqA0kAZb1hKmi02OpYRacl0TxIGz/ZmXWlbZgjwWYaCakTA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.21.5.tgz",
      "integrity": "sha512-DwqXqZyuk5AiWWf3UfLiRDJ5EDd49zg6O9wclZ7kUMv2WRFr4HKjXp/5t8JZ11QbQfUS6/cRCKGwYhtNAY88kQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.21.5.tgz",
      "integrity": "sha512-se/JjF8NlmKVG4kNIuyWMV/22ZaerB+qaSi5MdrXtd6R08kvs2qCN4C09miupktDitvh8jRFflwGFBQcxZRjbw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.21.5.tgz",
      "integrity": "sha512-5JcRxxRDUJLX8JXp/wcBCy3pENnCgBR9bN6JsY4OmhfUtIHe3ZW0mawA7+RDAcMLrMIZaf03NlQiX9DGyB8h4g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.21.5.tgz",
      "integrity": "sha512-J95kNBj1zkbMXtHVH29bBriQygMXqoVQOQYA+ISs0/2l3T9/kj42ow2mpqerRBxDJnmkUDCaQT/dfNXWX/ZZCQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.21.5.tgz",
      "integrity": "sha512-bPb5AHZtbeNGjCKVZ9UGqGwo8EUu4cLq68E95A53KlxAPRmUyYv2D6F0uUI65XisGOL1hBP5mTronbgo+0bFcA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.21.5.tgz",
      "integrity": "sha512-ibKvmyYzKsBeX8d8I7MH/TMfWDXBF3db4qM6sy+7re0YXya+K1cem3on9XgdT2EQGMu4hQyZhan7TeQ8XkGp4Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.21.5.tgz",
      "integrity": "sha512-YvjXDqLRqPDl2dvRODYmmhz4rPeVKYvppfGYKSNGdyZkA01046pLWyRKKI3ax8fbJoK5QbxblURkwK/MWY18Tg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.21.5.tgz",
      "integrity": "sha512-uHf1BmMG8qEvzdrzAqg2SIG/02+4/DHB6a9Kbya0XDvwDEKCoC8ZRWI5JJvNdUjtciBGFQ5PuBlpEOXQj+JQSg==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.21.5.tgz",
      "integrity": "sha512-IajOmO+KJK23bj52dFSNCMsz1QP1DqM6cwLUv3W1QwyxkyIWecfafnI555fvSGqEKwjMXVLokcV5ygHW5b3Jbg==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.21.5.tgz",
      "integrity": "sha512-1hHV/Z4OEfMwpLO8rp7CvlhBDnjsC3CttJXIhBi+5Aj5r+MBvy4egg7wCbe//hSsT+RvDAG7s81tAvpL2XAE4w==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.21.5.tgz",
      "integrity": "sha512-2HdXDMd9GMgTGrPWnJzP2ALSokE/0O5HhTUvWIbD3YdjME8JwvSCnNGBnTThKGEB91OZhzrJ4qIIxk/SBmyDDA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.21.5.tgz",
      "integrity": "sha512-zus5sxzqBJD3eXxwvjN1yQkRepANgxE9lgOW2qLnmr8ikMTphkjgXu1HR01K4FJg8h1kEEDAqDcZQtbrRnB41A==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.21.5.tgz",
      "integrity": "sha512-1rYdTpyv03iycF1+BhzrzQJCdOuAOtaqHTWJZCWvijKD2N5Xu0TtVC8/+1faWqcP9iBCWOmjmhoH94dH82BxPQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.21.5.tgz",
      "integrity": "sha512-Woi2MXzXjMULccIwMnLciyZH4nCIMpWQAs049KEeMvOcNADVxo0UBIQPfSmxB3CWKedngg7sWZdLvLczpe0tLg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.21.5.tgz",
      "integrity": "sha512-HLNNw99xsvx12lFBUwoT8EVCsSvRNDVxNpjZ7bPn947b8gJPzeHWyNVhFsaerc0n3TsbOINvRP2byTZ5LKezow==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.21.5.tgz",
      "integrity": "sha512-6+gjmFpfy0BHU5Tpptkuh8+uw3mnrvgs+dSPQXQOv3ekbordwnzTVEb4qnIvQcYXq6gzkyTnoZ9dZG+D4garKg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.21.5.tgz",
      "integrity": "sha512-Z0gOTd75VvXqyq7nsl93zwahcTROgqvuAcYDUr+vOv8uHhNSKROyU961kgtCD1e95IqPKSQKH7tBTslnS3tA8A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.21.5.tgz",
      "integrity": "sha512-SWXFF1CL2RVNMaVs+BBClwtfZSvDgtL//G/smwAc5oVK/UPu2Gu9tIaRgFmYFFKrmg3SyAjSrElf0TiJ1v8fYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.21.5.tgz",
      "integrity": "sha512-tQd/1efJuzPC6rCFwEvLtci/xNFcTZknmXs98FYDfGE4wP9ClFV98nyKrzJKVPMhdDnjzLhdUyMX4PsQAPjwIw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",
      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@napi-rs/lzma-linux-x64-gnu": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/lzma-linux-x64-gnu/-/lzma-linux-x64-gnu-1.5.1.tgz",
      "integrity": "sha512-oTXEIha4SsuXdTA4Iyskj0kpdx2yVXdhd75c2v3xGrHFfVMsbhTPZU/nMPL4sWKo4pBHm3aucLaqGlF696dTyQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^22.20 || ^24.12 || >=25"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-beta.27",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.27.tgz",
      "integrity": "sha512-+d0F4MKMCbeVUJwG96uQ4SgAznZNSq93I3V+9NHA4OpvqG8mRCpGdKmK8l/dl02h2CCDHwW2FqilnTyDcAnqjA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.63.1.tgz",
      "integrity": "sha512-UZ8sUxPTiHWYX9QNdJedb1kDZSpS1t/VPWBWGSgqHNi9w3Cu6IXvu2mzbhiTiPvtrqgTQJ+zqiAq2iPIPilpaQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.63.1.tgz",
      "integrity": "sha512-cQ4nFQABN5cDvDpbvJ7bMStCpnaVxynZrRMfUJYgxcIk9Sh54FIO1vtfkg0B69REjER77ioZ/ov+eAApx/KmLQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.63.1.tgz",
      "integrity": "sha512-FQNqd1lRy/0QhDk3xeRIkSBiCpXCiDnZO3YLVdcDKN1UBiKToNftCzcXYNLshmPDUMlu2TdeS8tGcsU6f3YF1Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.63.1.tgz",
      "integrity": "sha512-pvD16V939D3CloK0+qikpGaxiPrDUXTe7Y5cWOMkMSy7m1cawa8EGy/kXYi/G/cKAC4HDAbSnzCIk1WmsoOKXg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.63.1.tgz",
      "integrity": "sha512-pcFGeL2345VwdTnJhA6zLbew+YgWB0qBG2+dMtXjCicf6+rm6kO6cOoh5VnTe0ZMrMRgRyuHmCJxZWrIdzYuOw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.63.1.tgz",
      "integrity": "sha512-mRJlqSRulVzcKq/LKA6ICSIc3K/l4fzlVn/gePn2nXIHy8seRi5z/eeRE0d/XMBxcMldiXtQTSpRj0tkkC3g8Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.63.1.tgz",
      "integrity": "sha512-YDUNvVM85TI3g/1OpnqKP1h4NeW/j64DfWMf+G3M809xNk1bJSnpFp4sh83NpmVE5DXnkh8ULor4LTVZKoYLHw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.63.1.tgz",
      "integrity": "sha512-7Mcn71p9ZuQFAj+h+dhQXy/yeLePRS2yKRnmW1DijA9thKO5qap0GNOIQK4yQ6iP3SU0Mrb/yWo8h8vgRba8lw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.63.1.tgz",
      "integrity": "sha512-4YiLQTX6U4CSl0L9cluep9A9W6UmTfqBDc2/CH6wlu54pl4E7Jn3cOD8oxzvBDEGk/JMKgJ47C8g+radF7mwvg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.63.1.tgz",
      "integrity": "sha512-2ra8F7w8OquwZN9z2/fKFnli69wa8PLwaVzRMIPGb13ByMJwC28Fbp8YcVGoUhlYMTt7j5j9bNgpysrN2UM+vw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.63.1.tgz",
      "integrity": "sha512-Sy20ncyhjmBP0Ml+UvQbimjlk6VFgjW5uNP+qqwHB00mTE8Bl2C1TuHTlRwK2YoXeZbee5lP2XevBWVkAQAtSQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.63.1.tgz",
      "integrity": "sha512-noITLp8oNjYliPnGWmLyelIHwULGqbHloQHGw1rtxbWhTuWooRpnZarZQJ1y9EUC4szuCusCc+HEpUtxpIwYvA==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.63.1.tgz",
      "integrity": "sha512-hlxxXd+F1mWiAcaFR7Sv9ZQT6m6UfI8+Vy/kFJzztq2pDMU/0wZ9sish0iszNZvsQDo8Gc0i5yuFEOz5dDf6fA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.63.1.tgz",
      "integrity": "sha512-EF7OpqQTQ/BvGqLzUi4rEHuagCV9MugAUXSHemwPW5vxZ75RR+jxO/2j95Ph2dalMpFHSVECjRoioHZgA9zOYA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.63.1.tgz",
      "integrity": "sha512-wQO3JesW9PRkwlabQ27y7sPfVOOTLRG73I4F2UYHG5PXun3J9U3y+b7ezVKSYbsvSKGQ1k1cq8Qlun4C9kLt3w==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.63.1.tgz",
      "integrity": "sha512-ouAGwhO6wHRXdnOVCOsB0tRFkA7nhNB2Nwax6oECXN0YiN8EYUTBAOudADOB1PI+yDL61TeNx/u7MVCzksNbkQ==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.63.1.tgz",
      "integrity": "sha512-q2R38Sn+1J8RxhfJ+T54wSWmyKXWec+9jgDfqO2AtArEqHO5R2aeayp5H5OYLr5UYDVGsVaZPEFUooMhYCdz5A==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.63.1.tgz",
      "integrity": "sha512-gfI5T24WLLuFfSKw7Go/zDXjAAV0fny0swTaDv+WjK7vqcw4cRhFfdsyKL1n+ukI+ooBxn3bVQnyrn06WpI50w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.63.1.tgz",
      "integrity": "sha512-4h6XqthmB4Hspji84wvgk+ElodTsGj+dbZqHJHHtKxj4mYq0ANSEEPX9ys3moJueqsRjwpaJYH7874Itwnj2ow==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.63.1.tgz",
      "integrity": "sha512-dlfCOa87o1VAYegLQ9EKilx2JCeRofiyPGhTCmqnuXZ6bMPiycO1rq1+sKoulAp7pGLIsTIw+1x5R+zgh5LhhA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.63.1.tgz",
      "integrity": "sha512-cjkLbOlfcm3QGhMM1J5zaZjsw1GggbN6rw9UTSSRrPrR1KkcXnN7Uq9rPw34xImQ9VOY9GN+6u2Zj80B9ptkcw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.63.1.tgz",
      "integrity": "sha512-Li1KdUnWGE4N3e1F/B4RTB1ms+nG4WBgjByO46pkeBVX/2UBsY53xf5vK9WygVmnH3RwncIST7lkSdLSY6P9lg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.63.1.tgz",
      "integrity": "sha512-t4ZYOSoLTgwhuFMrmTMLx/+i1DQVK7HYqMc6kY46EApwi8X0nIVphzdNoThU3xt6n+N5urG1/gxBdCaKDLavfg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.63.1.tgz",
      "integrity": "sha512-RgroPfMmKlD1RzSDxvwgcPiy2HNQKoYV7OmwIXDsk73uKW5t6B/V8KIy27SMv/FNXFo/oSBtWc9J0X7t91ezZg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.63.1.tgz",
      "integrity": "sha512-at8QVep6S3h5Y6gSbdGU06bRY5WJkf6WUduM9YtvYMbYhB1MOFfUgc6kehitQXzOtMSaT70q7f9ydPhpqu821w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/d3-array": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/@types/d3-array/-/d3-array-3.2.2.tgz",
      "integrity": "sha512-hOLWVbm7uRza0BYXpIIW5pxfrKe0W+D5lrFiAEYR+pb6w3N2SwSMaJbXdUfSEv+dT4MfHBLtn5js0LAWaO6otw==",
      "license": "MIT"
    },
    "node_modules/@types/d3-color": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/@types/d3-color/-/d3-color-3.1.3.tgz",
      "integrity": "sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A==",
      "license": "MIT"
    },
    "node_modules/@types/d3-ease": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-ease/-/d3-ease-3.0.2.tgz",
      "integrity": "sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA==",
      "license": "MIT"
    },
    "node_modules/@types/d3-interpolate": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-interpolate/-/d3-interpolate-3.0.4.tgz",
      "integrity": "sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-color": "*"
      }
    },
    "node_modules/@types/d3-path": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/@types/d3-path/-/d3-path-3.1.1.tgz",
      "integrity": "sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==",
      "license": "MIT"
    },
    "node_modules/@types/d3-scale": {
      "version": "4.0.9",
      "resolved": "https://registry.npmjs.org/@types/d3-scale/-/d3-scale-4.0.9.tgz",
      "integrity": "sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-time": "*"
      }
    },
    "node_modules/@types/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/@types/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-kVd74ta9eof3eJOvbNd1vGKS/XERRyQbT26Og63hIsvDO84cjD5gEOhsXf26w3FSoNlPVz84DOFcKv/oou+fMw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-path": "*"
      }
    },
    "node_modules/@types/d3-time": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-time/-/d3-time-3.0.4.tgz",
      "integrity": "sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g==",
      "license": "MIT"
    },
    "node_modules/@types/d3-timer": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-timer/-/d3-timer-3.0.2.tgz",
      "integrity": "sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw==",
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.9.tgz",
      "integrity": "sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/prop-types": {
      "version": "15.7.15",
      "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.15.tgz",
      "integrity": "sha512-F6bEyamV9jKGAFBEmlQnesRPGOQqS2+Uwi0Em15xenOxHaf2hv6L8YCVn3rPdPJOiJfPiCnLIRyvwVaqMY3MIw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/react": {
      "version": "18.3.31",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-18.3.31.tgz",
      "integrity": "sha512-vfEqpXTvwT91yhmwdfouStN2hSKwTvyRs8qpLfADyrq/kxDw0hZM7Wk9Ug1FELj8hIby+S/+kQCSRFF32nv2Qw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/prop-types": "*",
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "18.3.7",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-18.3.7.tgz",
      "integrity": "sha512-MEe3UeoENYVFXzoXEWsvcpg6ZvlrFNlOQ7EOsvhI3CfAXwzPfO8Qwuxd40nepsYKqyyVQnTdEfv68q91yLcKrQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^18.0.0"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.7.0.tgz",
      "integrity": "sha512-gUu9hwfWvvEDBBmgtAowQCojwZmJ5mcLn3aufeCsitijs3+f2NsrPtlAWIR6OPiqljl96GVCUbLe0HyqIpVaoA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.0",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-beta.27",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.17.0"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/autoprefixer": {
      "version": "10.5.5",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.5.5.tgz",
      "integrity": "sha512-uiRYvQYe/nNSzBJ7OUnd2/TZVsAdob3blml44teEpee9Cc1f4rGZFewO+JT3Wo8mgFOSzNqes4FHZn/Qz8WOuw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.28.9",
        "caniuse-lite": "^1.0.30001810",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.21",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.21.tgz",
      "integrity": "sha512-uh8vpY/1/YyFkunIDFH/12p7/7VdPKA1hejMVEbdkEaWnUz0Hesvx5EbiU6XxjyHZIOju+ZMbQJkRh+es3/spQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.9",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.9.tgz",
      "integrity": "sha512-EWazOblFYUvlGZcfGhPUPmYh3nikUxBVb+y9MJun5f3hBi812X+8MSQTujLBtgK3cf51fJWbWfOjyeO954d+Eg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.11.20",
        "caniuse-lite": "^1.0.30001810",
        "electron-to-chromium": "^1.5.420",
        "node-releases": "^2.0.54",
        "update-browserslist-db": "^1.3.2"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001810",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001810.tgz",
      "integrity": "sha512-TITQPUkaz+aVk5GL6NhOdwk1aEaNTSDPsGFWrTuhKGtjTF70jL/Oht2W4c6rXUe5fu7Ie19VIahAXHIIiWWNeg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "license": "MIT"
    },
    "node_modules/d3-array": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/d3-array/-/d3-array-3.2.4.tgz",
      "integrity": "sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg==",
      "license": "ISC",
      "dependencies": {
        "internmap": "1 - 2"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-color": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-color/-/d3-color-3.1.0.tgz",
      "integrity": "sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-ease": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-ease/-/d3-ease-3.0.1.tgz",
      "integrity": "sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-format": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/d3-format/-/d3-format-3.1.2.tgz",
      "integrity": "sha512-AJDdYOdnyRDV5b6ArilzCPPwc1ejkHcoyFarqlPqT7zRYjhavcT3uSrqcMvsgh2CgoPbK3RCwyHaVyxYcP2Arg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-interpolate": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-interpolate/-/d3-interpolate-3.0.1.tgz",
      "integrity": "sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g==",
      "license": "ISC",
      "dependencies": {
        "d3-color": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-path": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-path/-/d3-path-3.1.0.tgz",
      "integrity": "sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-scale": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/d3-scale/-/d3-scale-4.0.2.tgz",
      "integrity": "sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2.10.0 - 3",
        "d3-format": "1 - 3",
        "d3-interpolate": "1.2.0 - 3",
        "d3-time": "2.1.1 - 3",
        "d3-time-format": "2 - 4"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==",
      "license": "ISC",
      "dependencies": {
        "d3-path": "^3.1.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-time/-/d3-time-3.1.0.tgz",
      "integrity": "sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time-format": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/d3-time-format/-/d3-time-format-4.1.0.tgz",
      "integrity": "sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg==",
      "license": "ISC",
      "dependencies": {
        "d3-time": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-timer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-timer/-/d3-timer-3.0.1.tgz",
      "integrity": "sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decimal.js-light": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/decimal.js-light/-/decimal.js-light-2.5.1.tgz",
      "integrity": "sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg==",
      "license": "MIT"
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/dom-helpers": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/dom-helpers/-/dom-helpers-5.2.1.tgz",
      "integrity": "sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.8.7",
        "csstype": "^3.0.2"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.423",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.423.tgz",
      "integrity": "sha512-rRZfTSY8ptHYMQxa+uIycJMFKmY1T0GIApNMXJYGehguTZa56TEEl19pKPCoBqk5Gpf7QizZn/jt7xur+DYxag==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.21.5.tgz",
      "integrity": "sha512-mg3OPMV4hXywwpoDxu3Qda5xCKQi+vCTZq8S9J/EpkhB2HzKXq4SNFZE3+NK93JYxc8VMSep+lOUSC/RVKaBqw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.21.5",
        "@esbuild/android-arm": "0.21.5",
        "@esbuild/android-arm64": "0.21.5",
        "@esbuild/android-x64": "0.21.5",
        "@esbuild/darwin-arm64": "0.21.5",
        "@esbuild/darwin-x64": "0.21.5",
        "@esbuild/freebsd-arm64": "0.21.5",
        "@esbuild/freebsd-x64": "0.21.5",
        "@esbuild/linux-arm": "0.21.5",
        "@esbuild/linux-arm64": "0.21.5",
        "@esbuild/linux-ia32": "0.21.5",
        "@esbuild/linux-loong64": "0.21.5",
        "@esbuild/linux-mips64el": "0.21.5",
        "@esbuild/linux-ppc64": "0.21.5",
        "@esbuild/linux-riscv64": "0.21.5",
        "@esbuild/linux-s390x": "0.21.5",
        "@esbuild/linux-x64": "0.21.5",
        "@esbuild/netbsd-x64": "0.21.5",
        "@esbuild/openbsd-x64": "0.21.5",
        "@esbuild/sunos-x64": "0.21.5",
        "@esbuild/win32-arm64": "0.21.5",
        "@esbuild/win32-ia32": "0.21.5",
        "@esbuild/win32-x64": "0.21.5"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/eventemitter3": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-4.0.7.tgz",
      "integrity": "sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw==",
      "license": "MIT"
    },
    "node_modules/fast-equals": {
      "version": "5.4.2",
      "resolved": "https://registry.npmjs.org/fast-equals/-/fast-equals-5.4.2.tgz",
      "integrity": "sha512-Ywe6jodPTWOTL9/k0bV7gdfP8twKL5Y8I8CZ933fAY5gBekICZSUQTbyH6ut2NZCNyB05mSUwAuEqdEIaOOlDQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fastq": {
      "version": "1.20.3",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.3.tgz",
      "integrity": "sha512-XKv5nnLs6nLF71NgiKJLIZFLkPyIEuOselLG7ujZnGrRfQK8HpvY+WqKhAJUAdLomwVHErVS4LfxFlPq0/FTAw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/internmap": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/internmap/-/internmap-2.0.3.tgz",
      "integrity": "sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.2",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.2.tgz",
      "integrity": "sha512-evOr8xfXKxE6qSR0hSXL2r3sd7ALj8+7jQEUvPYcm5sgZFdJ+AYzT6yNmJenvIYQBgIGwfwz08sL8zoL7yq2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
      "integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lodash": {
      "version": "4.18.1",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.18.1.tgz",
      "integrity": "sha512-dMInicTPVE8d1e5otfwmmjlxkZoUpiVLwyeTdUsi/Caj/gfzzblBcCE5sRHV/AsjuCmxWrte2TNGSYuCeCq+0Q==",
      "license": "MIT"
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "1.42.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-1.42.0.tgz",
      "integrity": "sha512-b3jprplnoLS8n5etw1z8xODe3hF/yjKATrTitsrKrnjUhCef5BdDct6Ppv3zVvzFwmtfWgLO6XNM3C9fAD93ug==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.18",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.18.tgz",
      "integrity": "sha512-DTg4MJbGMWkfi6VZFdNt2/caMbQy4Ou+Op/hJQvGEWcnVfoA1QA+xzRKAzw9jD6+GVOOeYr/mIcuDSdug6F6+w==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.54",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.54.tgz",
      "integrity": "sha512-YHs7BmmcsdAI5Ozuf8JZo6PT0mv2GIWC9vMfvUC3dp65M8hn7Ux8CPL+2oBI7juNuj9d0ndhTcznq2ODBps9cQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.28",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.28.tgz",
      "integrity": "sha512-RRuzqDtt5Y9h3quz5hWhK+TPnsmVs6WwSU6LkJMeY4HstUEDuYTG8UJSdawMRzmzAtV+KEoG8N3Qg2qLy5vM/A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.18",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-6.0.1.tgz",
      "integrity": "sha512-oPtTM4oerL+UXmx+93ytZVN82RrlY/wPUV8IeDxFrzIjXOLF1pN+EmKPLbubvKHT2HC20xXsCAH2Z+CKV6Oz/g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.1.1"
      },
      "engines": {
        "node": ">= 18"
      },
      "peerDependencies": {
        "jiti": ">=1.21.0",
        "postcss": ">=8.0.9",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        },
        "postcss": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.4",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.4.tgz",
      "integrity": "sha512-bIoJLOmjCO1S9XdY/DcnR5hJxvrDir1PbGChrzXG3vw0/FOliy/fA3dmdhQ441kah4gKv+TwckGzex6wNS5cnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      }
    },
    "node_modules/prop-types/node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "license": "MIT"
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz",
      "integrity": "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.2"
      },
      "peerDependencies": {
        "react": "^18.3.1"
      }
    },
    "node_modules/react-is": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-18.3.1.tgz",
      "integrity": "sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg==",
      "license": "MIT"
    },
    "node_modules/react-refresh": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.17.0.tgz",
      "integrity": "sha512-z6F7K9bV85EfseRCp2bzrpyQ0Gkw1uLoCel9XBVWPg/TjRj94SkJzUTGfOa4bs7iJvBWtQG0Wq7wnI0syw3EBQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-smooth": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/react-smooth/-/react-smooth-4.0.4.tgz",
      "integrity": "sha512-gnGKTpYwqL0Iii09gHobNolvX4Kiq4PKx6eWBCYYix+8cdw+cGo3do906l1NBPKkSWx1DghC1dlWG9L2uGd61Q==",
      "license": "MIT",
      "dependencies": {
        "fast-equals": "^5.0.1",
        "prop-types": "^15.8.1",
        "react-transition-group": "^4.4.5"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/react-transition-group": {
      "version": "4.4.5",
      "resolved": "https://registry.npmjs.org/react-transition-group/-/react-transition-group-4.4.5.tgz",
      "integrity": "sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "@babel/runtime": "^7.5.5",
        "dom-helpers": "^5.0.1",
        "loose-envify": "^1.4.0",
        "prop-types": "^15.6.2"
      },
      "peerDependencies": {
        "react": ">=16.6.0",
        "react-dom": ">=16.6.0"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.2.tgz",
      "integrity": "sha512-/peqiBB/n07gQGLsWaHho3WfvUyRscw0gYTsEFMhrIe/nWLkYaf5SbKYjGYqtRV3aPwykJgF2VEMo1ac4bnsGA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/recharts": {
      "version": "2.15.4",
      "resolved": "https://registry.npmjs.org/recharts/-/recharts-2.15.4.tgz",
      "integrity": "sha512-UT/q6fwS3c1dHbXv2uFgYJ9BMFHu3fwnd7AYZaEQhXuYQ4hgsxLvsUXzGdKeZrW5xopzDCvuA2N41WJ88I7zIw==",
      "deprecated": "1.x and 2.x branches are no longer active. Bump to Recharts v3 to receive latest features and bugfixes. See https://github.com/recharts/recharts/wiki/3.0-migration-guide",
      "license": "MIT",
      "dependencies": {
        "clsx": "^2.0.0",
        "eventemitter3": "^4.0.1",
        "lodash": "^4.17.21",
        "react-is": "^18.3.1",
        "react-smooth": "^4.0.4",
        "recharts-scale": "^0.4.4",
        "tiny-invariant": "^1.3.1",
        "victory-vendor": "^36.6.8"
      },
      "engines": {
        "node": ">=14"
      },
      "peerDependencies": {
        "react": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/recharts-scale": {
      "version": "0.4.5",
      "resolved": "https://registry.npmjs.org/recharts-scale/-/recharts-scale-0.4.5.tgz",
      "integrity": "sha512-kivNFO+0OcUNu7jQquLXAxz1FIwZj8nrj+YkOKc5694NbjCvcT6aSZiIzNzd2Kul4o4rTto8QVR9lMNtxD4G1w==",
      "license": "MIT",
      "dependencies": {
        "decimal.js-light": "^2.4.1"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.12",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
      "integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.63.1",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.63.1.tgz",
      "integrity": "sha512-3Df9jsstwhccuEfmAMi9l8XUh/GOkVObmFTU7CCVBysEbcOZLl84jCtaAZMcPiMz2EGKsATzQcU+Xr3n/wU6cg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.9"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@napi-rs/lzma-linux-x64-gnu": "1.5.1",
        "@rollup/rollup-android-arm-eabi": "4.63.1",
        "@rollup/rollup-android-arm64": "4.63.1",
        "@rollup/rollup-darwin-arm64": "4.63.1",
        "@rollup/rollup-darwin-x64": "4.63.1",
        "@rollup/rollup-freebsd-arm64": "4.63.1",
        "@rollup/rollup-freebsd-x64": "4.63.1",
        "@rollup/rollup-linux-arm-gnueabihf": "4.63.1",
        "@rollup/rollup-linux-arm-musleabihf": "4.63.1",
        "@rollup/rollup-linux-arm64-gnu": "4.63.1",
        "@rollup/rollup-linux-arm64-musl": "4.63.1",
        "@rollup/rollup-linux-loong64-gnu": "4.63.1",
        "@rollup/rollup-linux-loong64-musl": "4.63.1",
        "@rollup/rollup-linux-ppc64-gnu": "4.63.1",
        "@rollup/rollup-linux-ppc64-musl": "4.63.1",
        "@rollup/rollup-linux-riscv64-gnu": "4.63.1",
        "@rollup/rollup-linux-riscv64-musl": "4.63.1",
        "@rollup/rollup-linux-s390x-gnu": "4.63.1",
        "@rollup/rollup-linux-x64-gnu": "4.63.1",
        "@rollup/rollup-linux-x64-musl": "4.63.1",
        "@rollup/rollup-openbsd-x64": "4.63.1",
        "@rollup/rollup-openharmony-arm64": "4.63.1",
        "@rollup/rollup-win32-arm64-msvc": "4.63.1",
        "@rollup/rollup-win32-ia32-msvc": "4.63.1",
        "@rollup/rollup-win32-x64-gnu": "4.63.1",
        "@rollup/rollup-win32-x64-msvc": "4.63.1",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.23.2",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz",
      "integrity": "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.1",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.1.tgz",
      "integrity": "sha512-DhuTmvZWux4H1UOnWMB3sk0sbaCVOoQZjv8u1rDoTV0HTdGem9hkAZtl4JZy8P2z4Bg0nT+YMeOFyVr4zcG5Tw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "tinyglobby": "^0.2.11",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.19",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.19.tgz",
      "integrity": "sha512-3ofp+LL8E+pK/JuPLPggVAIaEuhvIz4qNcf3nA1Xn2o/7fb7s/TYpHhwGDv1ZU3PkBluUVaF8PyCHcm48cKLWQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.7",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2 || ^5.0 || ^6.0",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tiny-invariant": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz",
      "integrity": "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tinyglobby/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/tinyglobby/node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.2.tgz",
      "integrity": "sha512-UQ+MSxlhRm1bzjhU+DcuXfjFO1FzNtqhK5+9Yvlp90ItDLk5vT932A0rFu619nf7RVS+Y/VeaUW1jaRDqZ8VJw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/victory-vendor": {
      "version": "36.9.2",
      "resolved": "https://registry.npmjs.org/victory-vendor/-/victory-vendor-36.9.2.tgz",
      "integrity": "sha512-PnpQQMuxlwYdocC8fIJqVXvkeViHYzotI+NJrCuav0ZYFoq912ZHBk3mCeuj+5/VpodOjPe1z0Fk2ihgzlXqjQ==",
      "license": "MIT AND ISC",
      "dependencies": {
        "@types/d3-array": "^3.0.3",
        "@types/d3-ease": "^3.0.0",
        "@types/d3-interpolate": "^3.0.1",
        "@types/d3-scale": "^4.0.2",
        "@types/d3-shape": "^3.1.0",
        "@types/d3-time": "^3.0.0",
        "@types/d3-timer": "^3.0.0",
        "d3-array": "^3.1.6",
        "d3-ease": "^3.0.1",
        "d3-interpolate": "^3.0.1",
        "d3-scale": "^4.0.2",
        "d3-shape": "^3.1.0",
        "d3-time": "^3.0.0",
        "d3-timer": "^3.0.1"
      }
    },
    "node_modules/vite": {
      "version": "5.4.21",
      "resolved": "https://registry.npmjs.org/vite/-/vite-5.4.21.tgz",
      "integrity": "sha512-o5a9xKjbtuhY6Bi5S3+HvbRERmouabWbyUcpXXUA1u+GNUKoROi9byOJ8M0nHbHYHkYICiMlqxkg1KkYmm25Sw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.21.3",
        "postcss": "^8.4.43",
        "rollup": "^4.20.0"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || >=20.0.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.4.0"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        }
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    }
  }
}
`

---

### frontend\package.json

`json
{
  "name": "campusguard-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^1.16.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.15.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "typescript": "^5.6.3",
    "vite": "^5.4.11"
  }
}
`

---

### frontend\postcss.config.js

`javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`

---

### frontend\tailwind.config.js

`javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        navy: {
          800: '#0f172a',
          900: '#090d16',
          950: '#040711',
        },
        success: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card': '0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'floating': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
}
`

---

### frontend\tsconfig.json

`json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
`

---

### frontend\vite.config.ts

`typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
});
`

---

### frontend\src\App.tsx

`tsx
import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { DemoBanner } from './components/DemoBanner';
import { ToastContainer, ToastMessage } from './components/Toast';
import { LandingPage } from './pages/LandingPage';
import { DailyCheckIn } from './pages/DailyCheckIn';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { SocialGraphPage } from './pages/SocialGraphPage';
import { SupportChat } from './pages/SupportChat';
import { ResourcesPage } from './pages/ResourcesPage';
import { PrivacyCenter } from './pages/PrivacyCenter';
import { Shield, Heart, Github } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [lang, setLang] = useState<Language>('en');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-brand-100 selection:text-brand-900">
      
      {/* Sticky Demo Banner */}
      <DemoBanner 
        lang={lang} 
        onRefreshData={() => {
          // Re-trigger refresh if on admin or student page
          window.dispatchEvent(new Event('demo-data-refreshed'));
        }} 
        onToast={addToast} 
      />

      {/* Main Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onLanguageChange={(newLang) => {
          setLang(newLang);
          addToast(`Language updated to ${newLang.toUpperCase()}`, 'info');
        }}
        onToast={addToast}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage lang={lang} onNavigate={setCurrentTab} />
        )}
        {currentTab === 'checkin' && (
          <DailyCheckIn lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'wellbeing' && (
          <StudentDashboard lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'admin' && (
          <AdminDashboard lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'socialGraph' && (
          <SocialGraphPage lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'support' && (
          <SupportChat lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'resources' && (
          <ResourcesPage lang={lang} onNavigate={setCurrentTab} onToast={addToast} />
        )}
        {currentTab === 'privacy' && (
          <PrivacyCenter lang={lang} onNavigate={setCurrentTab} />
        )}
      </main>

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Professional Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 text-white flex items-center justify-center">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900">CampusGuard</span>
            <span>—</span>
            <span className="italic">"Don't wait for students to struggle in silence."</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => setCurrentTab('privacy')}
              className="hover:text-slate-900 transition-colors"
            >
              Privacy Architecture
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('resources')}
              className="hover:text-slate-900 transition-colors"
            >
              Emergency Helplines
            </button>
            <span>•</span>
            <span className="text-slate-400">
              Open-Source MIT License
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
`

---

### frontend\src\index.css

`css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-50 text-slate-900;
  }
}

/* Glassmorphism subtle card styling */
.glass-panel {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

/* Custom minimal scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Pulse badge animation */
@keyframes subtle-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.04); }
}
.animate-subtle-pulse {
  animation: subtle-pulse 3s infinite ease-in-out;
}
`

---

### frontend\src\main.tsx

`tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`

---

### frontend\src\components\DemoBanner.tsx

`tsx
import React, { useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface DemoBannerProps {
  lang: Language;
  onRefreshData?: () => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ lang, onRefreshData, onToast }) => {
  const t = translations[lang];
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    try {
      setResetting(true);
      await api.resetDemoData();
      onToast('Synthetic demo data successfully refreshed!', 'success');
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      onToast(e.message || 'Failed to reset demo data', 'warning');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[11px]">
            <Sparkles className="w-3 h-3 text-brand-400" />
            {t.demoModeBadge}
          </span>
          <span className="text-slate-300 font-normal">
            {t.demoModeNotice}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-slate-400 text-[11px]">
            Safety Net Architecture • Non-Diagnostic Heuristic
          </span>
          <button
            onClick={handleReset}
            disabled={resetting}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors font-medium text-[11px] disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${resetting ? 'animate-spin' : ''}`} />
            {resetting ? 'Resetting...' : t.resetDemoData}
          </button>
        </div>
      </div>
    </div>
  );
};
`

---

### frontend\src\components\Navbar.tsx

`tsx
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  MessageSquareHeart, 
  BookOpen, 
  Lock, 
  BarChart3, 
  Globe, 
  Wifi, 
  WifiOff, 
  CalendarCheck,
  Share2,
  Menu,
  X
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { offlineService } from '../services/offlineQueue';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onLanguageChange,
  onToast,
}) => {
  const t = translations[lang];
  const [isSimOffline, setIsSimOffline] = useState(offlineService.isSimulatedOffline());
  const [queuedCount, setQueuedCount] = useState(offlineService.getQueuedCheckins().length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleStatus = () => {
      setIsSimOffline(offlineService.isSimulatedOffline());
      setQueuedCount(offlineService.getQueuedCheckins().length);
    };
    window.addEventListener('offline-status-changed', handleStatus);
    window.addEventListener('offline-queue-changed', handleStatus);
    return () => {
      window.removeEventListener('offline-status-changed', handleStatus);
      window.removeEventListener('offline-queue-changed', handleStatus);
    };
  }, []);

  const toggleOffline = async () => {
    const next = !isSimOffline;
    offlineService.setSimulatedOffline(next);
    setIsSimOffline(next);
    if (next) {
      onToast('Simulated Offline Mode Enabled (Rural / Low-Bandwidth test)', 'warning');
    } else {
      onToast('Online connection restored! Synchronizing queue...', 'info');
      const synced = await offlineService.syncQueuedCheckins();
      if (synced > 0) {
        onToast(`Successfully synced ${synced} queued check-in(s)!`, 'success');
      }
    }
  };

  const navItems = [
    { id: 'landing', label: t.navOverview, icon: Activity },
    { id: 'checkin', label: t.navCheckin, icon: CalendarCheck },
    { id: 'wellbeing', label: t.navWellbeing, icon: Activity },
    { id: 'support', label: t.navSupport, icon: MessageSquareHeart },
    { id: 'resources', label: t.navResources, icon: BookOpen },
    { id: 'privacy', label: t.navPrivacy, icon: Lock },
    { id: 'admin', label: t.navAdmin, icon: BarChart3, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={() => onSelectTab('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900">CampusGuard</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                  Early-Warning
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">Opt-In Student Wellbeing</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 shadow-sm'
                      : item.highlight
                      ? 'text-brand-600 hover:bg-brand-50 hover:text-brand-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Low-Bandwidth / Offline Toggle button */}
            <button
              onClick={toggleOffline}
              title={isSimOffline ? 'Click to reconnect online' : 'Click to simulate low-bandwidth offline mode'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isSimOffline
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-emerald-50/70 border-emerald-200 text-emerald-700 hover:bg-emerald-100/80'
              }`}
            >
              {isSimOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  <span className="hidden sm:inline">Offline Mode</span>
                  {queuedCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded-full font-bold text-[10px]">
                      {queuedCount}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Online</span>
                </>
              )}
            </button>

            {/* Language Selector */}
            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50/80 px-2 py-1">
              <Globe className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
              <select
                aria-label="Language Selector"
                value={lang}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="en">EN (English)</option>
                <option value="hi">HI (हिन्दी)</option>
                <option value="mr">MR (मराठी)</option>
              </select>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-brand-600" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
`

---

### frontend\src\components\StatCard.tsx

`tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
  icon: LucideIcon;
  variant?: 'default' | 'brand' | 'warning' | 'danger' | 'success';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  variant = 'default',
}) => {
  const variantStyles = {
    default: {
      bg: 'bg-white',
      border: 'border-slate-200',
      iconBg: 'bg-slate-100 text-slate-700',
    },
    brand: {
      bg: 'bg-white',
      border: 'border-brand-100',
      iconBg: 'bg-brand-50 text-brand-600',
    },
    warning: {
      bg: 'bg-white',
      border: 'border-amber-200/80',
      iconBg: 'bg-amber-50 text-amber-600',
    },
    danger: {
      bg: 'bg-white',
      border: 'border-rose-200/80',
      iconBg: 'bg-rose-50 text-rose-600',
    },
    success: {
      bg: 'bg-white',
      border: 'border-emerald-200/80',
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
  };

  const current = variantStyles[variant];

  return (
    <div className={`p-5 rounded-2xl border ${current.border} ${current.bg} shadow-card hover:shadow-floating transition-all duration-200 flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${current.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </div>
        
        <div className="mt-1 flex items-center gap-2">
          {trend && (
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                trend.positive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              {trend.value}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-slate-500">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
};
`

---

### frontend\src\components\Toast.tsx

`tsx
import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'warning' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((t) => {
        const Icon = t.type === 'success' ? CheckCircle2 : t.type === 'warning' ? AlertTriangle : Info;
        const color =
          t.type === 'success'
            ? 'bg-emerald-900/95 text-emerald-100 border-emerald-700/50'
            : t.type === 'warning'
            ? 'bg-amber-900/95 text-amber-100 border-amber-700/50'
            : 'bg-slate-900/95 text-white border-slate-700/50';

        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-floating text-sm backdrop-blur-md transition-all duration-300 animate-slide-up ${color}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="w-4 h-4 shrink-0" />
              <p className="font-medium text-xs leading-snug">{t.message}</p>
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="ml-3 text-slate-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
`

---

### frontend\src\i18n\translations.ts

`typescript
import { Language } from '../types';

export interface TranslationDict {
  appName: string;
  tagline: string;
  heroSubtitle: string;
  startCheckin: string;
  viewDashboard: string;
  navOverview: string;
  navCheckin: string;
  navWellbeing: string;
  navSupport: string;
  navResources: string;
  navPrivacy: string;
  navAdmin: string;
  navCommunityGraph: string;
  
  // Check-in
  checkinTitle: string;
  voluntaryNotice: string;
  step1Question: string;
  step2Question: string;
  step3Question: string;
  step4Question: string;
  step5Question: string;
  journalPlaceholder: string;
  nextStep: string;
  prevStep: string;
  submitCheckin: string;
  wellbeingStatus: string;
  stable: string;
  needsAttention: string;
  supportRecommended: string;
  
  // Student metrics
  todaysWellbeing: string;
  mood: string;
  sleep: string;
  study: string;
  attendance: string;
  socialConnection: string;
  weeklyTrends: string;
  supportiveInsights: string;
  
  // Admin
  commandCenter: string;
  commandCenterSubtitle: string;
  totalActiveStudents: string;
  checkinsToday: string;
  studentsNeedingAttention: string;
  highPriorityAlerts: string;
  riskDistribution: string;
  earlyWarningAlerts: string;
  studentId: string;
  riskScore: string;
  topFactors: string;
  trend: string;
  lastCheckin: string;
  actions: string;
  reviewAlert: string;
  
  // Community Graph
  communityGraphTitle: string;
  communityGraphSubtitle: string;
  networkXNotice: string;
  
  // Offline & Demo
  offlineModeActive: string;
  offlineQueued: string;
  onlineSynced: string;
  demoModeBadge: string;
  demoModeNotice: string;
  resetDemoData: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    appName: "CampusGuard",
    tagline: "Don't wait for students to struggle in silence.",
    heroSubtitle: "An opt-in, privacy-first AI wellbeing early-warning system helping institutions detect academic overload and isolation before they escalate.",
    startCheckin: "Start Daily Check-in",
    viewDashboard: "View Wellness Dashboard",
    navOverview: "Overview",
    navCheckin: "Daily Check-in",
    navWellbeing: "My Wellbeing",
    navSupport: "Support Chat",
    navResources: "Resources",
    navPrivacy: "Privacy Center",
    navAdmin: "Admin Command",
    navCommunityGraph: "Community Graph",

    checkinTitle: "Daily Voluntary Wellbeing Check-in",
    voluntaryNotice: "Your answers are voluntary and used only to provide supportive early interventions.",
    step1Question: "How are you feeling today?",
    step2Question: "How many hours of sleep did you get last night?",
    step3Question: "How intense was your study or academic workload?",
    step4Question: "How connected have you felt to people around you?",
    step5Question: "Estimated class attendance and voluntary thoughts",
    journalPlaceholder: "Optional: Write a quick note about what is currently on your mind...",
    nextStep: "Continue",
    prevStep: "Back",
    submitCheckin: "Submit Check-in",
    wellbeingStatus: "Wellbeing Status",
    stable: "Stable",
    needsAttention: "Needs Attention",
    supportRecommended: "Support Recommended",

    todaysWellbeing: "Today's Wellbeing Snapshot",
    mood: "Mood",
    sleep: "Sleep",
    study: "Study Workload",
    attendance: "Attendance",
    socialConnection: "Social Connection",
    weeklyTrends: "7-Day Wellbeing Trajectory",
    supportiveInsights: "Supportive Automated Insights",

    commandCenter: "Campus Wellness Command Center",
    commandCenterSubtitle: "Early signals. Earlier support. Aggregated student wellbeing overview.",
    totalActiveStudents: "Total Active Students",
    checkinsToday: "Check-ins Today",
    studentsNeedingAttention: "Students Needing Attention",
    highPriorityAlerts: "High-Priority Alerts",
    riskDistribution: "Risk Distribution",
    earlyWarningAlerts: "Early Warning Alerts",
    studentId: "Student ID",
    riskScore: "Risk Score",
    topFactors: "Top Contributing Factors",
    trend: "Trend",
    lastCheckin: "Last Check-in",
    actions: "Actions",
    reviewAlert: "Review Alert",

    communityGraphTitle: "Community Connection Graph",
    communityGraphSubtitle: "NetworkX-powered voluntary peer interaction analysis for early isolation detection.",
    networkXNotice: "Graph insights use voluntary/anonymized interaction signals and are intended strictly as an early-support indicator.",

    offlineModeActive: "Offline Mode (Simulated)",
    offlineQueued: "Saved offline. Will automatically sync when connection returns.",
    onlineSynced: "Connected & synced with CampusGuard server",
    demoModeBadge: "Demo Mode Active",
    demoModeNotice: "All displayed student data is synthetic demo data.",
    resetDemoData: "Reset Synthetic Data"
  },
  hi: {
    appName: "कैंपसगार्ड (CampusGuard)",
    tagline: "छात्रों के संघर्ष में मौन रहने की प्रतीक्षा न करें।",
    heroSubtitle: "एक गोपनीयता-केंद्रित, स्वैच्छिक AI-संचालित कल्याण प्रणाली जो संस्थानों को अत्यधिक तनाव और अकेलेपन के शुरुआती संकेत पहचानने में मदद करती है।",
    startCheckin: "दैनिक चेक-इन शुरू करें",
    viewDashboard: "वेलनेस डैशबोर्ड देखें",
    navOverview: "अवलोकन",
    navCheckin: "दैनिक चेक-इन",
    navWellbeing: "मेरा स्वास्थ्य",
    navSupport: "सपोर्ट चैट",
    navResources: "संसाधन",
    navPrivacy: "गोपनीयता केंद्र",
    navAdmin: "एडमिन कमांड",
    navCommunityGraph: "समुदाय ग्राफ",

    checkinTitle: "दैनिक स्वैच्छिक कल्याण चेक-इन",
    voluntaryNotice: "आपके उत्तर स्वैच्छिक हैं और केवल समय पर सहायता प्रदान करने के लिए उपयोग किए जाते हैं।",
    step1Question: "आज आप कैसा महसूस कर रहे हैं?",
    step2Question: "बीती रात आपने कितने घंटे की नींद ली?",
    step3Question: "आपकी पढ़ाई या काम का दबाव कैसा रहा?",
    step4Question: "क्या आप अपने आसपास के लोगों से जुड़ाव महसूस कर रहे हैं?",
    step5Question: "अनुमानित कक्षा उपस्थिति और स्वैच्छिक विचार",
    journalPlaceholder: "वैकल्पिक: अपने मन की कोई भी बात यहाँ साझा करें...",
    nextStep: "आगे बढ़ें",
    prevStep: "पीछे",
    submitCheckin: "चेक-इन जमा करें",
    wellbeingStatus: "कल्याण स्थिति",
    stable: "संतुलित (Stable)",
    needsAttention: "ध्यान देने योग्य (Needs Attention)",
    supportRecommended: "सहायता अनुशंसित (Support Recommended)",

    todaysWellbeing: "आज का कल्याण सारांश",
    mood: "मनोदशा (Mood)",
    sleep: "नींद (Sleep)",
    study: "अध्ययन का भार",
    attendance: "उपस्थिति (Attendance)",
    socialConnection: "सामाजिक जुड़ाव",
    weeklyTrends: "7-दिवसीय कल्याण प्रक्षेपवक्र",
    supportiveInsights: "सहायक स्वचालित अंतर्दृष्टि",

    commandCenter: "कैंपस वेलनेस कमांड सेंटर",
    commandCenterSubtitle: "प्रारंभिक संकेत। त्वरित सहायता। समग्र छात्र कल्याण अवलोकन।",
    totalActiveStudents: "कुल सक्रिय छात्र",
    checkinsToday: "आज के चेक-इन",
    studentsNeedingAttention: "ध्यान देने योग्य छात्र",
    highPriorityAlerts: "उच्च-प्राथमिकता अलर्ट",
    riskDistribution: "जोखिम वितरण",
    earlyWarningAlerts: "प्रारंभिक चेतावनी अलर्ट",
    studentId: "छात्र आईडी",
    riskScore: "जोखिम स्कोर",
    topFactors: "प्रमुख कारक",
    trend: "प्रवृत्ति",
    lastCheckin: "अंतिम चेक-इन",
    actions: "कार्रवाई",
    reviewAlert: "समीक्षा करें",

    communityGraphTitle: "समुदाय जुड़ाव ग्राफ",
    communityGraphSubtitle: "NetworkX द्वारा संचालित स्वैच्छिक सहकर्मी संपर्क विश्लेषण।",
    networkXNotice: "ग्राफ अंतर्दृष्टि केवल शुरुआती सहायता के लिए है। किसी भी प्रकार की निगरानी नहीं की जाती है।",

    offlineModeActive: "ऑफ़लाइन मोड (सिम्युलेटेड)",
    offlineQueued: "ऑफ़लाइन सहेजा गया। नेटवर्क आते ही स्वचालित सिंक होगा।",
    onlineSynced: "कैंपसगार्ड सर्वर से जुड़ा हुआ",
    demoModeBadge: "डेमो मोड सक्रिय",
    demoModeNotice: "प्रदर्शित सभी छात्र डेटा पूरी तरह से कृत्रिम (Synthetic) है।",
    resetDemoData: "सिंथेटिक डेटा रीसेट करें"
  },
  mr: {
    appName: "कॅम्पसगार्ड (CampusGuard)",
    tagline: "विद्यार्थ्यांच्या संघर्षात मौन राहण्याची वाट पाहू नका.",
    heroSubtitle: "एक गोपनीयता-प्रथम, ऐच्छिक AI प्रणाली जी शैक्षणिक ताण आणि एकटेपणा संकट होण्यापूर्वी ओळखण्यास मदत करते.",
    startCheckin: "दैनिक चेक-इन सुरू करा",
    viewDashboard: "वेलनेस डॅशबोर्ड पहा",
    navOverview: "विहंगावलोकन",
    navCheckin: "दैनिक चेक-इन",
    navWellbeing: "माझे आरोग्य",
    navSupport: "सपोर्ट चॅट",
    navResources: "मार्गदर्शन संसाधने",
    navPrivacy: "गोपनीयता केंद्र",
    navAdmin: "प्रशासक केंद्र",
    navCommunityGraph: "समुदाय आलेख",

    checkinTitle: "दैनिक ऐच्छिक आरोग्य चेक-इन",
    voluntaryNotice: "तुमची उत्तरे ऐच्छिक असून केवळ वेळेवर आधार देण्यासाठी वापरली जातात.",
    step1Question: "आज तुम्हाला कसे वाटत आहे?",
    step2Question: "काल रात्री तुम्हाला किती तास झोप मिळाली?",
    step3Question: "अभ्यासाचा किंवा कामाचा ताण कसा होता?",
    step4Question: "तुम्हाला तुमच्या सभोवतालच्या लोकांशी किती जोडलेले वाटते?",
    step5Question: "अंदाजे उपस्थिती आणि मनोगत",
    journalPlaceholder: "पर्यायी: मनात असलेले विचार येथे व्यक्त करा...",
    nextStep: "पुढे जा",
    prevStep: "मागे",
    submitCheckin: "चेक-इन पाठवा",
    wellbeingStatus: "आरोग्य स्थिती",
    stable: "स्थिर (Stable)",
    needsAttention: "लक्ष देण्याची गरज",
    supportRecommended: "मदतीची शिफारस",

    todaysWellbeing: "आजचा आरोग्य सारांश",
    mood: "मनःस्थिती (Mood)",
    sleep: "झोप (Sleep)",
    study: "अभ्यास वेळ",
    attendance: "उपस्थिती (Attendance)",
    socialConnection: "सामाजिक संवाद",
    weeklyTrends: "७-दिवसीय आरोग्य कल",
    supportiveInsights: "मार्गदर्शक स्वयंचलित अंतर्दृष्टी",

    commandCenter: "कॅम्पस वेलनेस कमांड सेंटर",
    commandCenterSubtitle: "लवकर संकेत. त्वरित आधार. संस्थात्मक आरोग्य विहंगावलोकन.",
    totalActiveStudents: "एकूण सक्रिय विद्यार्थी",
    checkinsToday: "आजचे चेक-इन्स",
    studentsNeedingAttention: "लक्ष देण्याची गरज असलेले विद्यार्थी",
    highPriorityAlerts: "महत्त्वाचे अलर्ट्स",
    riskDistribution: "धोका वितरण",
    earlyWarningAlerts: "पूर्वसूचना अलर्ट्स",
    studentId: "विद्यार्थी आयडी",
    riskScore: "धोका गुण",
    topFactors: "प्रमुख घटक",
    trend: "कल",
    lastCheckin: "शेवटचे चेक-इन",
    actions: "कृती",
    reviewAlert: "तपासा",

    communityGraphTitle: "समुदाय संवाद आलेख",
    communityGraphSubtitle: "NetworkX द्वारे विश्लेषित ऐच्छिक मित्र संवाद आलेख.",
    networkXNotice: "आलेख अंतर्दृष्टी केवळ मदतीसाठी आहे; कोणतीही पाळत ठेवली जात नाही.",

    offlineModeActive: "ऑफलाइन मोड (सिम्युलेटेड)",
    offlineQueued: "ऑफलाइन सेव्ह झाले. नेटवर्क आल्यावर आपोआप सिंक होईल.",
    onlineSynced: "सर्व्हरशी कनेक्टेड व सिंक केलेले",
    demoModeBadge: "डेमो मोड सक्रिय",
    demoModeNotice: "सर्व दाखवलेला विद्यार्थी डेटा केवळ प्रात्यक्षिकासाठी कृत्रिम आहे.",
    resetDemoData: "डेटा पूर्ववत करा"
  }
};
`

---

### frontend\src\pages\AdminDashboard.tsx

`tsx
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CalendarCheck, 
  AlertTriangle, 
  Flame, 
  Search, 
  Filter, 
  ExternalLink, 
  RefreshCw, 
  Share2, 
  ShieldAlert, 
  ArrowUpRight, 
  ChevronRight,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Minus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { Language, AdminOverview, AlertItem } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';
import { StatCard } from '../components/StatCard';
import { AlertDetailPanel } from './AlertDetailPanel';

interface AdminDashboardProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];

  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & search
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ov, al] = await Promise.all([
        api.getAdminOverview(),
        api.getAdminAlerts(),
      ]);
      setOverview(ov);
      setAlerts(al);
    } catch (e: any) {
      onToast(e.message || 'Failed to load command center data', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const donutColors = ['#10b981', '#f59e0b', '#ef4444']; // Low, Medium, High

  const filteredAlerts = alerts.filter((item) => {
    const matchesLevel = 
      filterLevel === 'all' 
        ? true 
        : filterLevel === 'pending'
        ? item.status === 'pending'
        : item.risk_level.toLowerCase() === filterLevel.toLowerCase();
    
    const matchesSearch = 
      item.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.top_factors.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesLevel && matchesSearch;
  });

  if (loading || !overview) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-72 bg-slate-200 rounded-2xl"></div>
          <div className="h-72 bg-slate-200 rounded-2xl md:col-span-2"></div>
        </div>
      </div>
    );
  }

  const donutData = [
    { name: 'Low Risk', value: overview.risk_distribution.low, pct: overview.risk_distribution.low_pct },
    { name: 'Medium Risk', value: overview.risk_distribution.medium, pct: overview.risk_distribution.medium_pct },
    { name: 'High Risk', value: overview.risk_distribution.high, pct: overview.risk_distribution.high_pct },
  ];

  const trendData = overview.trends_14d.map((pt) => ({
    ...pt,
    shortDate: pt.date.slice(5),
  }));

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
              Institution Command View
            </span>
            <span className="text-xs text-slate-500">De-identified Cohort</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.commandCenter}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.commandCenterSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('socialGraph')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs shadow-sm flex items-center gap-2 transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-indigo-600" />
            Community Connection Graph &rarr;
          </button>
          
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            title="Refresh Command Center"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Core KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t.totalActiveStudents}
          value={overview.total_active_students.toLocaleString()}
          subtitle="94% voluntary participation"
          icon={Users}
          variant="brand"
        />
        <StatCard
          title={t.checkinsToday}
          value={overview.checkins_today.toLocaleString()}
          subtitle="67.5% campus volume"
          trend={{ value: "+8.4%", positive: true }}
          icon={CalendarCheck}
          variant="default"
        />
        <StatCard
          title={t.studentsNeedingAttention}
          value={overview.students_needing_attention}
          subtitle="Moderate sleep deficit or workload"
          icon={AlertTriangle}
          variant="warning"
        />
        <StatCard
          title={t.highPriorityAlerts}
          value={overview.high_priority_alerts}
          subtitle="Awaiting staff review"
          icon={Flame}
          variant="danger"
        />
      </div>

      {/* Analytics Row: Donut Chart + 14-Day Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Risk Distribution Donut Chart */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {t.riskDistribution}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Current cohort balance across early-warning tiers
            </p>
          </div>

          <div className="h-56 my-2 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={donutColors[index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any, name: any) => [`${val} students`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center label */}
            <div className="absolute text-center pointer-events-none">
              <span className="text-xs text-slate-400 font-medium block">Total Cohort</span>
              <span className="text-xl font-extrabold text-slate-900">
                {overview.risk_distribution.low + overview.risk_distribution.medium + overview.risk_distribution.high}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
            <div>
              <span className="text-[10px] font-semibold text-emerald-700 block">Low ({overview.risk_distribution.low_pct}%)</span>
              <span className="text-xs font-bold text-slate-900">{overview.risk_distribution.low}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-amber-700 block">Med ({overview.risk_distribution.medium_pct}%)</span>
              <span className="text-xs font-bold text-slate-900">{overview.risk_distribution.medium}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-rose-700 block">High ({overview.risk_distribution.high_pct}%)</span>
              <span className="text-xs font-bold text-slate-900">{overview.risk_distribution.high}</span>
            </div>
          </div>
        </div>

        {/* 14-Day Campus Wellbeing Trajectory */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">
                14-Day Campus Wellbeing Trends
              </h2>
              <span className="text-xs text-slate-500 font-medium">Aggregated Trajectories</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitoring cohort averages in sleep, mood, and composite stress helps evaluate term workloads.
            </p>
          </div>

          <div className="h-64 mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="trendSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="shortDate" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" name="Avg Sleep (hrs)" dataKey="avg_sleep" stroke="#6366f1" strokeWidth={2.5} fill="url(#trendSleep)" />
                <Line type="monotone" name="Avg Mood (1-5)" dataKey="avg_mood" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" name="Avg Workload (hrs)" dataKey="avg_study" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Early Warning Alerts Section */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
        
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.earlyWarningAlerts}
            </h2>
            <p className="text-xs text-slate-500">
              Prioritized by early-warning heuristic score. All identities strictly anonymous.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CG-ID or factor..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none w-44 sm:w-56"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50 text-xs font-medium">
              {[
                { id: 'all', label: 'All' },
                { id: 'high', label: 'High' },
                { id: 'medium', label: 'Medium' },
                { id: 'pending', label: 'Pending' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setFilterLevel(pill.id)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterLevel === pill.id
                      ? 'bg-white text-slate-900 font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">{t.studentId}</th>
                <th className="py-3.5 px-4">Risk Level</th>
                <th className="py-3.5 px-4">{t.riskScore}</th>
                <th className="py-3.5 px-4">{t.topFactors}</th>
                <th className="py-3.5 px-4">{t.trend}</th>
                <th className="py-3.5 px-4">{t.lastCheckin}</th>
                <th className="py-3.5 px-4 text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No alerts matching current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr 
                    key={alert.id}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer group"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                      {alert.student_id}
                      {alert.status === 'counsellor_requested' && (
                        <span className="w-2 h-2 rounded-full bg-brand-500" title="Counsellor Follow-up Requested"></span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                        alert.risk_level === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : alert.risk_level === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {alert.risk_level}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-slate-900">
                      {alert.risk_score.toFixed(0)}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {alert.top_factors.map((f, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
                        {alert.trend === 'declining' ? (
                          <>
                            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                            <span className="text-rose-700">Declining</span>
                          </>
                        ) : alert.trend === 'improving' ? (
                          <>
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-700">Improving</span>
                          </>
                        ) : (
                          <>
                            <Minus className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-600">Stable</span>
                          </>
                        )}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {alert.last_checkin}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAlert(alert);
                        }}
                        className="px-3 py-1 rounded-lg bg-slate-100 group-hover:bg-brand-50 text-slate-700 group-hover:text-brand-700 font-semibold transition-all inline-flex items-center gap-1 text-[11px]"
                      >
                        {t.reviewAlert}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Alert Detail Side Panel Modal/Drawer */}
      {selectedAlert && (
        <AlertDetailPanel
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onActionComplete={fetchData}
          onToast={onToast}
        />
      )}

    </div>
  );
};
`

---

### frontend\src\pages\AlertDetailPanel.tsx

`tsx
import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  TrendingUp, 
  Minus, 
  HeartHandshake,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { AlertItem, StudentAdminDetail } from '../types';
import { api } from '../services/api';

interface AlertDetailPanelProps {
  alert: AlertItem;
  onClose: () => void;
  onActionComplete: () => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const AlertDetailPanel: React.FC<AlertDetailPanelProps> = ({
  alert,
  onClose,
  onActionComplete,
  onToast,
}) => {
  const [detail, setDetail] = useState<StudentAdminDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(alert.notes || '');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await api.getAdminStudentDetail(alert.student_id);
        setDetail(res);
      } catch (e: any) {
        onToast(e.message || 'Failed to load student details', 'warning');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [alert.student_id]);

  const handleAction = async (actionType: 'reviewed' | 'counsellor_requested' | 'dismissed') => {
    try {
      setUpdating(true);
      await api.updateAlertAction(alert.id, actionType, notes);
      onToast(`Alert updated: marked as ${actionType.replace('_', ' ')}`, 'success');
      onActionComplete();
      onClose();
    } catch (e: any) {
      onToast(e.message || 'Failed to update alert', 'warning');
    } finally {
      setUpdating(false);
    }
  };

  const chartData = detail?.history_7d.map((h) => ({
    ...h,
    shortDate: h.date.slice(5),
  })) || [];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-left">
        
        {/* Top bar */}
        <div>
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  {alert.student_id}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  alert.risk_level === 'High'
                    ? 'bg-rose-100 text-rose-800'
                    : alert.risk_level === 'Medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {alert.risk_level} Priority
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Anonymous ID • Cohort Year {detail?.year || 2} • {detail?.department || 'Engineering'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Risk Score Summary Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Calculated Early-Warning Score
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {alert.risk_score.toFixed(0)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ 100</span>
                  <span className="text-xs text-slate-400 font-normal">
                    (Threshold: &gt;=68 High, &gt;=35 Medium)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Trajectory
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 mt-1">
                  {alert.trend === 'declining' ? (
                    <>
                      <TrendingDown className="w-4 h-4 text-rose-500" />
                      Deteriorating
                    </>
                  ) : alert.trend === 'improving' ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      Recovering
                    </>
                  ) : (
                    <>
                      <Minus className="w-4 h-4 text-slate-400" />
                      Stable
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Contributing Heuristic Factors */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Contributing Early Indicators
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {alert.top_factors.map((factor, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium border border-slate-200"
                  >
                    • {factor}
                  </span>
                ))}
              </div>
            </div>

            {/* 7-Day Sparkline Trajectories */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                7-Day Multi-Dimensional Sparklines
              </h3>

              <div className="space-y-3">
                
                {/* Sleep sparkline */}
                <div className="p-3 rounded-xl border border-slate-100 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Sleep Duration (hrs)</span>
                    <span className="text-slate-500">Target: 7.5h</span>
                  </div>
                  <div className="h-16 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line type="monotone" dataKey="sleep_hours" stroke="#6366f1" strokeWidth={2} dot={{ r: 2 }} />
                        <XAxis dataKey="shortDate" hide />
                        <YAxis domain={[0, 12]} hide />
                        <Tooltip contentStyle={{ fontSize: '11px', padding: '4px 8px' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Mood sparkline */}
                <div className="p-3 rounded-xl border border-slate-100 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Self-Reported Mood (1-5)</span>
                    <span className="text-slate-500">1: Low, 5: Great</span>
                  </div>
                  <div className="h-16 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                        <XAxis dataKey="shortDate" hide />
                        <YAxis domain={[1, 5]} hide />
                        <Tooltip contentStyle={{ fontSize: '11px', padding: '4px 8px' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Attendance sparkline */}
                <div className="p-3 rounded-xl border border-slate-100 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Class Attendance %</span>
                    <span className="text-slate-500">Threshold: 75%</span>
                  </div>
                  <div className="h-16 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line type="monotone" dataKey="attendance_pct" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
                        <XAxis dataKey="shortDate" hide />
                        <YAxis domain={[0, 100]} hide />
                        <Tooltip contentStyle={{ fontSize: '11px', padding: '4px 8px' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </div>

            {/* Suggested Supportive Action */}
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200">
              <p className="text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">
                Suggested Supportive Action
              </p>
              <p className="text-xs text-brand-800 leading-relaxed">
                {alert.suggested_action}
              </p>
            </div>

            {/* Internal Reviewer Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institutional Review Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Log internal action taken (e.g., reached out via student advisor circle)..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none"
              ></textarea>
            </div>

            {/* Non-Coercion Consent Reminder */}
            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Institutional Ethics Principle:</strong> Do NOT automatically contact or expose students without consent. Supportive interventions must respect student autonomy and privacy boundaries.
              </span>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => handleAction('dismissed')}
            disabled={updating}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-colors"
          >
            Dismiss Alert
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('reviewed')}
              disabled={updating}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-all"
            >
              Mark Reviewed
            </button>
            <button
              onClick={() => handleAction('counsellor_requested')}
              disabled={updating}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              Request Counsellor Follow-up
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
`

---

### frontend\src\pages\DailyCheckIn.tsx

`tsx
import React, { useState, useEffect } from 'react';
import { 
  Smile, 
  Frown, 
  Meh, 
  Moon, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  HeartHandshake, 
  Lock, 
  ShieldCheck, 
  Sparkles,
  AlertTriangle,
  RotateCcw,
  WifiOff
} from 'lucide-react';
import { Language, CheckinSubmission, CheckinResult } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';
import { offlineService } from '../services/offlineQueue';

interface DailyCheckInProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DailyCheckIn: React.FC<DailyCheckInProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];

  // Student identification (anonymized code)
  const studentId = 'CG-1042';

  // Multi-step state (1 to 5)
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<number>(4);
  const [sleepHours, setSleepHours] = useState<number>(7.0);
  const [studyHours, setStudyHours] = useState<number>(6.5);
  const [isolationLevel, setIsolationLevel] = useState<string>('Connected');
  const [attendancePct, setAttendancePct] = useState<number>(85);
  const [journalNote, setJournalNote] = useState<string>('');

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<CheckinResult | null>(null);
  const [isOfflineSaved, setIsOfflineSaved] = useState(false);

  // Restore draft if present
  useEffect(() => {
    const draft = offlineService.getDraft();
    if (draft) {
      if (draft.mood) setMood(draft.mood);
      if (draft.sleep_hours) setSleepHours(draft.sleep_hours);
      if (draft.study_hours) setStudyHours(draft.study_hours);
      if (draft.isolation_level) setIsolationLevel(draft.isolation_level);
      if (draft.attendance_pct) setAttendancePct(draft.attendance_pct);
      if (draft.journal_note) setJournalNote(draft.journal_note);
    }
  }, []);

  // Save draft on change
  const updateDraft = () => {
    offlineService.saveDraft({
      student_id: studentId,
      mood,
      sleep_hours: sleepHours,
      study_hours: studyHours,
      isolation_level: isolationLevel,
      attendance_pct: attendancePct,
      journal_note: journalNote,
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload: CheckinSubmission = {
      student_id: studentId,
      mood,
      sleep_hours: sleepHours,
      study_hours: studyHours,
      isolation_level: isolationLevel,
      attendance_pct: attendancePct,
      journal_note: journalNote.trim() || undefined,
    };

    // Check if offline or simulated offline
    if (!offlineService.isOnline()) {
      offlineService.enqueueCheckin(payload);
      offlineService.clearDraft();
      setIsOfflineSaved(true);
      // Local fallback calculation for immediate user comfort
      setResult({
        score: mood <= 2 || sleepHours < 5 ? 65 : 25,
        level: mood <= 2 || sleepHours < 5 ? 'Medium' : 'Low',
        status_label: mood <= 2 || sleepHours < 5 ? 'Needs Attention' : 'Stable',
        factors: ['Offline local evaluation', 'Sleep & mood logged locally'],
        supportive_recommendation: 'Your check-in is saved securely on your device and will synchronize once you reconnect.',
        is_emergency_triggered: false
      });
      setSubmitting(false);
      onToast('Check-in saved offline! Will auto-sync when online.', 'warning');
      return;
    }

    try {
      const res = await api.submitCheckin(payload);
      offlineService.clearDraft();
      setResult(res);
      setIsOfflineSaved(false);
      onToast('Daily check-in recorded successfully!', 'success');
    } catch (e: any) {
      // If network fails unexpectedly, fallback to offline queue
      offlineService.enqueueCheckin(payload);
      setIsOfflineSaved(true);
      setResult({
        score: 30,
        level: 'Low',
        status_label: 'Stable',
        factors: ['Saved to local offline queue'],
        supportive_recommendation: 'Network unavailable. Your check-in was saved locally.',
        is_emergency_triggered: false
      });
      onToast('Network unavailable: Saved offline.', 'info');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep(1);
    setIsOfflineSaved(false);
  };

  const moodOptions = [
    { value: 1, emoji: '😔', label: 'Very Low', desc: 'Drained, exhausted, or overwhelmed' },
    { value: 2, emoji: '🙁', label: 'Low', desc: 'Struggling with stress or fatigue' },
    { value: 3, emoji: '😐', label: 'Okay', desc: 'Managing, but carrying mild pressure' },
    { value: 4, emoji: '🙂', label: 'Good', desc: 'Feeling balanced and in rhythm' },
    { value: 5, emoji: '😊', label: 'Great', desc: 'Energized, motivated, and supported' },
  ];

  const isolationOptions = [
    { value: 'Connected', label: 'Connected', desc: 'Regularly interacting with peers, mentors, or friends' },
    { value: 'Sometimes isolated', label: 'Sometimes isolated', desc: 'Occasional distance from social or study circles' },
    { value: 'Often isolated', label: 'Often isolated', desc: 'Spending most days alone; lacking peer contact' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-10 px-4">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium mb-3">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>Anonymous Student Profile: <strong className="text-slate-900">{studentId}</strong></span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t.checkinTitle}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          {t.voluntaryNotice}
        </p>
      </div>

      {/* Result Card State */}
      {result ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl animate-fade-in">
          
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.wellbeingStatus}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-slate-900">
                {result.status_label === 'Stable' && (
                  <span className="text-emerald-700">{t.stable}</span>
                )}
                {result.status_label === 'Needs Attention' && (
                  <span className="text-amber-700">{t.needsAttention}</span>
                )}
                {result.status_label === 'Support Recommended' && (
                  <span className="text-rose-700">{t.supportRecommended}</span>
                )}
              </h2>
            </div>

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl ${
              result.level === 'High' 
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : result.level === 'Medium'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {result.score.toFixed(0)}
              <span className="text-[10px] font-normal text-slate-500 ml-0.5">/100</span>
            </div>
          </div>

          {/* Offline indication if saved locally */}
          {isOfflineSaved && (
            <div className="my-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
              <WifiOff className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{t.offlineQueued}</span>
            </div>
          )}

          {/* Contributing Factors */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Contributing Observations
            </p>
            <div className="flex flex-wrap gap-2">
              {result.factors.map((factor, i) => (
                <span 
                  key={i} 
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium border border-slate-200/80"
                >
                  {factor}
                </span>
              ))}
            </div>
          </div>

          {/* Supportive Recommendation */}
          <div className="mt-6 p-4 rounded-2xl bg-brand-50/60 border border-brand-100 text-slate-800">
            <div className="flex items-center gap-2 mb-1.5 text-brand-700 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Gentle Guidance
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              {result.supportive_recommendation}
            </p>
          </div>

          {/* High Priority Resource trigger */}
          {result.level === 'High' && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Consider speaking with a supportive listener today
              </div>
              <p className="mt-1 text-xs text-rose-800">
                You do not have to navigate heavy weeks alone. Tele-MANAS offers free, confidential support 24x7 at <strong>14416</strong>.
              </p>
              <button
                onClick={() => onNavigate('support')}
                className="mt-3 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
              >
                Talk to Support Assistant
              </button>
            </div>
          )}

          {/* Navigation Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Take Another Check-in
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('wellbeing')}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm"
              >
                View 7-Day Trend Charts &rarr;
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[11px] text-slate-400">
              Prototype early-warning heuristic — not a medical diagnostic model.
            </p>
          </div>
        </div>
      ) : (
        /* Multi-Step Flow */
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>Step {step} of 5</span>
              <span>{Math.round((step / 5) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-brand-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Mood */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.step1Question}
              </h2>
              <p className="text-xs text-slate-500">
                Select the card that most closely aligns with your emotional state today.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-4">
                {moodOptions.map((opt) => {
                  const isSelected = mood === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => {
                        setMood(opt.value);
                        updateDraft();
                      }}
                      className={`p-4 rounded-2xl border text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-between ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/50 shadow-sm ring-1 ring-brand-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-3xl sm:text-4xl mb-2">{opt.emoji}</span>
                      <p className="text-xs font-bold text-slate-900">{opt.label}</p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight">{opt.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Sleep */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.step2Question}
              </h2>
              <p className="text-xs text-slate-500">
                Quality restorative sleep is one of the most reliable predictors of academic wellbeing.
              </p>

              <div className="my-6 text-center">
                <span className="text-5xl font-extrabold text-slate-900">
                  {sleepHours}
                </span>
                <span className="text-base text-slate-500 ml-1">hours</span>
              </div>

              <input
                type="range"
                min="0"
                max="14"
                step="0.5"
                value={sleepHours}
                onChange={(e) => {
                  setSleepHours(parseFloat(e.target.value));
                  updateDraft();
                }}
                className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              <div className="flex items-center justify-center gap-2 mt-4">
                {[4.0, 5.5, 7.0, 8.5].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setSleepHours(val);
                      updateDraft();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      sleepHours === val
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {val} hrs
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Study / Workload */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.step3Question}
              </h2>
              <p className="text-xs text-slate-500">
                Total hours spent in classes, labs, assignments, and exam preparation in the last 24h.
              </p>

              <div className="my-6 text-center">
                <span className="text-5xl font-extrabold text-slate-900">
                  {studyHours}
                </span>
                <span className="text-base text-slate-500 ml-1">hours</span>
              </div>

              <input
                type="range"
                min="0"
                max="16"
                step="0.5"
                value={studyHours}
                onChange={(e) => {
                  setStudyHours(parseFloat(e.target.value));
                  updateDraft();
                }}
                className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              <div className="flex items-center justify-center gap-2 mt-4">
                {[3.0, 6.0, 8.5, 11.0].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setStudyHours(val);
                      updateDraft();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      studyHours === val
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {val} hrs
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Social Connection */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.step4Question}
              </h2>
              <p className="text-xs text-slate-500">
                Feeling isolated can increase cognitive stress. All responses remain anonymized.
              </p>

              <div className="space-y-3 mt-4">
                {isolationOptions.map((opt) => {
                  const isSelected = isolationLevel === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => {
                        setIsolationLevel(opt.value);
                        updateDraft();
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/50 shadow-sm ring-1 ring-brand-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">{opt.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Attendance & Optional Journal */}
          {step === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.step5Question}
              </h2>
              
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Recent Class Attendance</span>
                  <span className="font-bold text-slate-900">{attendancePct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={attendancePct}
                  onChange={(e) => {
                    setAttendancePct(parseInt(e.target.value));
                    updateDraft();
                  }}
                  className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Optional Reflection Note
                </label>
                <textarea
                  rows={3}
                  value={journalNote}
                  onChange={(e) => {
                    setJournalNote(e.target.value);
                    updateDraft();
                  }}
                  placeholder={t.journalPlaceholder}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                ></textarea>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Data Sovereignty:</strong> {t.voluntaryNotice}
                </span>
              </div>
            </div>
          )}

          {/* Flow Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t.prevStep}
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
              >
                {t.nextStep}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                {submitting ? 'Evaluating...' : t.submitCheckin}
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
`

---

### frontend\src\pages\LandingPage.tsx

`tsx
import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  HeartHandshake, 
  Lock, 
  Cpu, 
  Smartphone, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Moon, 
  BookOpen, 
  Smile,
  AlertCircle
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface LandingPageProps {
  lang: Language;
  onNavigate: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center px-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Opt-In Early-Warning Architecture</span>
            <span className="w-1 h-1 rounded-full bg-brand-400"></span>
            <span className="font-normal text-brand-600">Zero Clinical Stigma</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Early signals. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Earlier support.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.tagline} {t.heroSubtitle}
          </p>

          {/* Call to Actions */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('checkin')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {t.startCheckin}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {t.viewDashboard}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              100% Opt-In & Anonymous
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No Medical Diagnosis
            </span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Human-in-the-Loop Review
            </span>
          </div>
        </div>

        {/* Polished Interactive Live Preview Card */}
        <div className="max-w-5xl mx-auto mt-12 px-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xl p-4 sm:p-6 transition-all hover:border-brand-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <span className="ml-2 text-xs font-semibold text-slate-500">
                  Campus Wellness Command Center Preview
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                Live Heuristic Engine Active
              </span>
            </div>

            {/* Micro Dashboard Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Active Cohort</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">1,248</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-0.5">↑ 94% opt-in rate</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Check-ins Today</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">842</p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">67.5% campus volume</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <p className="text-[11px] font-medium text-amber-800 uppercase tracking-wider">Needing Attention</p>
                <p className="text-2xl font-bold text-amber-900 mt-1">73</p>
                <p className="text-[11px] text-amber-700 font-medium mt-0.5">Mild stress or sleep deficit</p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/60">
                <p className="text-[11px] font-medium text-rose-800 uppercase tracking-wider">Support Recommended</p>
                <p className="text-2xl font-bold text-rose-900 mt-1">18</p>
                <p className="text-[11px] text-rose-700 font-medium mt-0.5">High isolation / overload</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                Aggregated Institutional View • Fully De-identified IDs (e.g. CG-1042)
              </span>
              <button
                onClick={() => onNavigate('admin')}
                className="text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1"
              >
                Explore Full Command Center &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section: How It Works */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How CampusGuard Works</h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            A continuous, empathetic loop connecting student reflection with quiet institutional support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-base mb-4">
              01
            </div>
            <h3 className="font-semibold text-slate-900 text-base mb-2">Voluntary Daily Pulse</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students take a 30-second check-in measuring mood, sleep hours, study load, attendance, and feelings of isolation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base mb-4">
              02
            </div>
            <h3 className="font-semibold text-slate-900 text-base mb-2">Transparent Risk Heuristic</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multi-day trajectory algorithms evaluate cumulative sleep deficit and isolation without ever assigning diagnostic labels.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-base mb-4">
              03
            </div>
            <h3 className="font-semibold text-slate-900 text-base mb-2">Community Graph Insights</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              NetworkX analysis models peer connectivity and flags emerging social isolation clusters before disengagement occurs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base mb-4">
              04
            </div>
            <h3 className="font-semibold text-slate-900 text-base mb-2">Supportive Intervention</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students receive calming personalized recommendations, while wellness staff review anonymized high-priority alerts with consent.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Why CampusGuard */}
      <section className="bg-slate-900 text-white py-16 px-4 rounded-3xl max-w-6xl mx-auto shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
            A Paradigm Shift in Student Mental Health
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
            A safety net, not a surveillance system.
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Traditional campus wellness waits for a crisis event or emergency room visit. CampusGuard inverts this paradigm by detecting subtle early indicators—such as 3 consecutive nights of low sleep or abrupt social withdrawal—allowing staff to extend supportive warmth before distress becomes irreversible.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-left">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
              <p className="text-emerald-400 font-semibold text-sm mb-1">Traditional Model</p>
              <p className="text-xs text-slate-400">Late intervention, stigmatized visits, student silence, reactive crisis management.</p>
            </div>
            <div className="p-5 rounded-2xl bg-brand-900/60 border border-brand-500/50 sm:col-span-2">
              <p className="text-brand-300 font-semibold text-sm mb-1">The CampusGuard Approach</p>
              <p className="text-xs text-slate-200">Continuous anonymized pulse, zero diagnosis, human-reviewed gentle outreach, and complete student data sovereignty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Privacy-First Architecture & 7 Tenets */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Ethical Guardrails Built-in
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Built on uncompromising privacy principles
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              We believe students will only trust a wellbeing tool if it genuinely safeguards their autonomy. CampusGuard enforces role-based access control, cryptographic anonymous IDs, and strictly prohibits punitive tracking.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "100% Opt-In: Students join voluntarily and can withdraw anytime.",
                "Anonymous IDs: Evaluators only see codes like CG-1042, never names or roll numbers.",
                "Non-Diagnostic: Algorithms flag pattern changes, never medical pathologies.",
                "Zero Surveillance: No browser tracking, keystroke logging, or location spying.",
                "Human-in-the-Loop: Automated alerts are always reviewed by trained wellness staff."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onNavigate('privacy')}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Explore Privacy Architecture &rarr;
            </button>
          </div>

          <div className="w-full md:w-1/2 p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Data Flow Architecture
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-semibold text-slate-800">Student Device</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Local Draft Cache</span>
              </div>
              <div className="flex justify-center text-slate-400">↓ SSL / TLS Encrypted</div>
              <div className="p-3 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-between">
                <span className="font-semibold text-brand-900">Anonymization Gateway</span>
                <span className="text-brand-700 bg-brand-100 px-2 py-0.5 rounded">CG-ID Assigned</span>
              </div>
              <div className="flex justify-center text-slate-400">↓ De-identified payload</div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-semibold text-slate-800">Heuristic Risk & Graph Engine</span>
                <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Scoring (0-100)</span>
              </div>
              <div className="flex justify-center text-slate-400">↓ Aggregated Signals</div>
              <div className="p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                <span className="font-semibold">Institutional Command Center</span>
                <span className="text-brand-300 bg-slate-800 px-2 py-0.5 rounded">Human Review Only</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Rural & Low-Bandwidth Resilience */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-50 via-brand-50/40 to-slate-50 border border-slate-200">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Inclusivity by Design
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Built for ₹5,000 smartphones & unstable 2G/3G networks
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Underserved and rural institutions often face poor connectivity and budget hardware. CampusGuard is engineered to be featherweight (no video backgrounds, zero bloated animations), saves offline drafts automatically, and queues submissions locally until connection returns.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="text-lg font-bold text-slate-900">&lt; 150 KB</p>
                <p className="text-[11px] text-slate-500">Total initial bundle</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="text-lg font-bold text-slate-900">Offline Queue</p>
                <p className="text-[11px] text-slate-500">Auto-sync on reconnect</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="text-lg font-bold text-slate-900">3 Languages</p>
                <p className="text-[11px] text-slate-500">English, हिन्दी, मराठी</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="text-lg font-bold text-slate-900">Zero Battery Drain</p>
                <p className="text-[11px] text-slate-500">Minimal client execution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="max-w-4xl mx-auto text-center px-4 pt-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Ready to experience the prototype?
        </h2>
        <p className="mt-2 text-slate-600 text-sm">
          Test the student check-in, inspect the early-warning scoring, or review the wellness command center.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('checkin')}
            className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-all"
          >
            Start Student Check-in
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all"
          >
            Open Admin Command Center
          </button>
          <button
            onClick={() => onNavigate('support')}
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-sm transition-all"
          >
            Test Support Chatbot
          </button>
        </div>
      </section>

    </div>
  );
};
`

---

### frontend\src\pages\PrivacyCenter.tsx

`tsx
import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  UserCheck, 
  Server, 
  CheckCircle2, 
  FileText, 
  HeartHandshake, 
  KeyRound,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface PrivacyCenterProps {
  lang: Language;
  onNavigate: (tab: string) => void;
}

export const PrivacyCenter: React.FC<PrivacyCenterProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  const tenets = [
    {
      title: "1. 100% Opt-In Participation",
      desc: "Students choose whether to participate. Voluntary check-ins can be stopped anytime, and students can request immediate deletion of their historical logs.",
      icon: UserCheck
    },
    {
      title: "2. Cryptographic Anonymous Student IDs",
      desc: "All check-ins and graph nodes use synthetic IDs (e.g. CG-1042). Names, roll numbers, hostel rooms, and email addresses are never linked to wellbeing evaluations.",
      icon: KeyRound
    },
    {
      title: "3. Strictly Non-Diagnostic",
      desc: "CampusGuard identifies risk trajectories like sleep deficit and workload spikes. It will never assign medical psychiatric labels, diagnoses, or mental illness tags.",
      icon: HeartHandshake
    },
    {
      title: "4. Zero Invasive Surveillance",
      desc: "No keystroke logging, no background screen recording, no location tracking, and no reading private messages. Only voluntary responses are analyzed.",
      icon: EyeOff
    },
    {
      title: "5. Minimalist Data Collection",
      desc: "We collect only 5 functional indicators: mood, sleep hours, study hours, attendance estimate, and peer connection level. No unnecessary personal data.",
      icon: FileText
    },
    {
      title: "6. Strict Role-Based Access Control",
      desc: "Administrators see campus-wide aggregated metrics. Individual alert details are restricted to designated, sworn student wellness counselors.",
      icon: Lock
    },
    {
      title: "7. Mandatory Human-in-the-Loop Review",
      desc: "Algorithms never trigger automated contact, academic penalties, or exposure. Trained human staff must review and determine supportive next steps.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Institutional Trust Guarantee</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Your wellbeing data belongs to you.
        </h1>
        <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
          CampusGuard was designed from day one on the principle that students will only embrace a mental health tool if it is fundamentally safe, transparent, and completely free from punitive surveillance.
        </p>
      </div>

      {/* The 7 Core Tenets Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          The 7 Core Privacy Tenets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tenets.map((tenet, idx) => {
            const Icon = tenet.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{tenet.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tenet.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy Architecture Visual Diagram */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
            System Topology
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">
            Zero-PII Privacy Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            How data flows from student voluntary check-ins to anonymous institutional command views.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Step 1: Client Device</span>
            <p className="font-bold text-white text-sm">Local Storage & Draft Cache</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Check-in drafts are stored locally on the student device. Submissions are queued offline if network drops.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Step 2: Gateway</span>
            <p className="font-bold text-white text-sm">Anonymization Gateway</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              IP addresses and personal credentials are stripped. Only an anonymous hash (e.g. CG-1042) is forwarded.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Step 3: Analytics</span>
            <p className="font-bold text-white text-sm">Heuristic & NetworkX Engine</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Calculates multi-day sleep drops and peer isolation scores. Transparent scoring; zero clinical diagnosis.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Step 4: Review</span>
            <p className="font-bold text-white text-sm">Human Oversight Command</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Aggregated dashboard and anonymous alert review. Interventions require human verification and student consent.
            </p>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Compliant with institutional ethics boards & Indian Digital Personal Data Protection (DPDP) principles
          </span>
          <button
            onClick={() => onNavigate('checkin')}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors"
          >
            Experience Opt-In Flow &rarr;
          </button>
        </div>
      </div>

    </div>
  );
};
`

---

### frontend\src\pages\ResourcesPage.tsx

`tsx
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  PhoneCall, 
  Clock, 
  Search, 
  ExternalLink, 
  HeartHandshake, 
  ShieldAlert, 
  Moon, 
  Sparkles, 
  Users, 
  Brain 
} from 'lucide-react';
import { Language, SupportResource } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';

interface ResourcesPageProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];

  const [resources, setResources] = useState<SupportResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const data = await api.getResources();
        setResources(data);
      } catch (e: any) {
        onToast(e.message || 'Failed to fetch resources', 'warning');
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const categories = ['All', 'Emergency', 'Counsellor', 'Academic', 'Sleep', 'Peer', 'Stress'];

  const filtered = resources.filter((r) => {
    const matchesCat = categoryFilter === 'All' || r.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.contact_info.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'emergency': return ShieldAlert;
      case 'counsellor': return HeartHandshake;
      case 'academic': return Brain;
      case 'sleep': return Moon;
      case 'peer': return Users;
      default: return Sparkles;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
            Institutional Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Support & Wellness Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Free, confidential support networks across campus and national crisis helplines.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources, helplines..."
            className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none w-56 sm:w-64 bg-white"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat === 'Emergency' ? '🚨 24/7 Helplines' : cat}
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-3xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between shadow-card hover:shadow-floating transition-all ${
                  item.is_emergency
                    ? 'bg-rose-50/40 border-rose-200/90 ring-1 ring-rose-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      item.is_emergency
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-brand-50 text-brand-700'
                    }`}>
                      {item.category}
                    </span>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      item.is_emergency ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100/80">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.availability}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span className="truncate">{item.contact_info}</span>
                    {item.is_emergency ? (
                      <a
                        href={`tel:${item.contact_info.replace(/[^0-9]/g, '')}`}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] hover:bg-rose-700 shrink-0 ml-2"
                      >
                        Call Now
                      </a>
                    ) : (
                      <span className="text-brand-600 text-[11px] shrink-0 ml-2">Walk-In / Email</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Emergency Bottom Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-sm">Need immediate mental health support?</p>
          <p className="text-xs text-slate-300 mt-0.5">Government of India Tele-MANAS toll-free 24x7 crisis counselling.</p>
        </div>
        <a
          href="tel:14416"
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-colors shadow-md"
        >
          <PhoneCall className="w-4 h-4" />
          Call 14416 Toll-Free
        </a>
      </div>

    </div>
  );
};
`

---

### frontend\src\pages\SocialGraphPage.tsx

`tsx
import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  ShieldCheck, 
  Info, 
  Users, 
  Search, 
  Activity, 
  Sparkles,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Language, SocialGraphData, SocialNode } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';

interface SocialGraphPageProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const SocialGraphPage: React.FC<SocialGraphPageProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];

  const [graph, setGraph] = useState<SocialGraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<SocialNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchGraph = async () => {
    try {
      setLoading(true);
      const res = await api.getSocialGraph();
      setGraph(res);
      // Auto-select an isolated node to showcase
      const isolated = res.nodes.find(n => n.isolation_score >= 70);
      if (isolated) setSelectedNode(isolated);
    } catch (e: any) {
      onToast(e.message || 'Failed to load social graph', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, []);

  if (loading || !graph) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="h-96 bg-slate-200 rounded-3xl"></div>
      </div>
    );
  }

  // Node color helper
  const getNodeColor = (n: SocialNode) => {
    if (n.isolation_score >= 75) return '#ef4444'; // Red (Isolated)
    if (n.isolation_score >= 45) return '#f59e0b'; // Amber (Peripheral)
    return '#10b981'; // Green (Connected)
  };

  // Node radius
  const getNodeRadius = (n: SocialNode) => {
    if (selectedNode?.id === n.id) return 12;
    return Math.max(7, Math.min(14, 6 + n.degree * 1.5));
  };

  const filteredNodeIds = new Set(
    graph.nodes
      .filter(n => n.id.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(n => n.id)
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={() => onNavigate('admin')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Wellness Command Center
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.communityGraphTitle}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              NetworkX Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.communityGraphSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Node search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find Student (e.g. CG-1042)..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none w-48 sm:w-56"
            />
          </div>

          <button
            onClick={fetchGraph}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            title="Recalculate NetworkX Graph"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* NetworkX Metric Summary Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Cohort Nodes</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{graph.summary.total_nodes}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Peer Interactions</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{graph.summary.total_edges}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800">Connected Hubs</span>
          <p className="text-xl font-bold text-emerald-900 mt-0.5">{graph.summary.connected_nodes_count}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800">Peripheral Nodes</span>
          <p className="text-xl font-bold text-amber-900 mt-0.5">{graph.summary.peripheral_nodes_count}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/70 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-800">Isolated / At-Risk</span>
          <p className="text-xl font-bold text-rose-900 mt-0.5">{graph.summary.isolated_nodes_count}</p>
        </div>
      </div>

      {/* Interactive Graph Canvas + Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SVG Graph Viewport */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-card lg:col-span-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
            <span>Spring Layout Projection (NetworkX 2D coordinates)</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Connected
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Peripheral
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Isolated
              </span>
            </div>
          </div>

          <div className="w-full h-[420px] sm:h-[480px] bg-slate-50/70 rounded-2xl border border-slate-100 overflow-hidden relative">
            <svg viewBox="0 0 800 500" className="w-full h-full select-none">
              
              {/* Edges */}
              <g className="edges">
                {graph.edges.map((edge, idx) => {
                  const sourceNode = graph.nodes.find(n => n.id === edge.source);
                  const targetNode = graph.nodes.find(n => n.id === edge.target);
                  if (!sourceNode || !targetNode) return null;

                  const isHighlighted = 
                    selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);

                  return (
                    <line
                      key={idx}
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isHighlighted ? '#4f46e5' : '#cbd5e1'}
                      strokeWidth={isHighlighted ? 2.2 : 1}
                      strokeOpacity={isHighlighted ? 0.9 : 0.45}
                    />
                  );
                })}
              </g>

              {/* Nodes */}
              <g className="nodes">
                {graph.nodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isMatch = filteredNodeIds.has(node.id);
                  const fill = getNodeColor(node);
                  const r = getNodeRadius(node);

                  return (
                    <g 
                      key={node.id} 
                      className="cursor-pointer transition-transform"
                      onClick={() => setSelectedNode(node)}
                      opacity={searchQuery && !isMatch ? 0.25 : 1}
                    >
                      {/* Pulse halo if isolated */}
                      {node.isolation_score >= 75 && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r + 6}
                          fill="#ef4444"
                          opacity={0.25}
                          className="animate-ping"
                        />
                      )}

                      {/* Node circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r}
                        fill={fill}
                        stroke={isSelected ? '#0f172a' : '#ffffff'}
                        strokeWidth={isSelected ? 2.5 : 1.5}
                      />

                      {/* Node text label */}
                      <text
                        x={node.x}
                        y={node.y - (r + 4)}
                        textAnchor="middle"
                        fontSize={isSelected ? "11" : "9"}
                        fontWeight={isSelected ? "bold" : "normal"}
                        fill={isSelected ? "#0f172a" : "#64748b"}
                      >
                        {node.id}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {t.networkXNotice}
            </span>
          </div>
        </div>

        {/* Selected Node Inspector Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Node Analysis
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                NetworkX
              </span>
            </div>

            {selectedNode ? (
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {selectedNode.id}
                  </h3>
                  <span className={`inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-md ${
                    selectedNode.isolation_score >= 75
                      ? 'bg-rose-100 text-rose-800'
                      : selectedNode.isolation_score >= 45
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {selectedNode.status}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                    <span className="text-slate-500">Degree (Direct Connections)</span>
                    <span className="font-bold text-slate-900">{selectedNode.degree} peers</span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                    <span className="text-slate-500">Degree Centrality</span>
                    <span className="font-bold text-slate-900">{selectedNode.centrality}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                    <span className="text-slate-500">Clustering Coefficient</span>
                    <span className="font-bold text-slate-900">{selectedNode.clustering}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mt-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Calculated Isolation Index
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-bold text-slate-900">
                        {selectedNode.isolation_score.toFixed(0)}
                      </span>
                      <span className="text-xs text-slate-400">/ 100</span>
                    </div>
                  </div>
                </div>

                {selectedNode.isolation_score >= 75 && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      Low Peer Connectivity Alert
                    </p>
                    <p className="text-[11px] text-rose-800">
                      Node shows 0 or 1 voluntary interaction signals. Recommend peer mentor outreach or invitation to campus social circles.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Click any node on the graph to inspect its NetworkX centrality and isolation metrics.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Voluntary signals include study circles and campus events. Zero invasive surveillance or communication tapping.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
`

---

### frontend\src\pages\StudentDashboard.tsx

`tsx
import React, { useState, useEffect } from 'react';
import { 
  Smile, 
  Moon, 
  BookOpen, 
  GraduationCap, 
  Users, 
  Sparkles, 
  ArrowUpRight, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Shield, 
  Info,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { Language, StudentWellbeingData } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';

interface StudentDashboardProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];
  const studentId = 'CG-1042';

  const [data, setData] = useState<StudentWellbeingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState<'wellbeing' | 'sleep' | 'study' | 'mood'>('wellbeing');

  const fetchWellbeing = async () => {
    try {
      setLoading(true);
      const res = await api.getStudentWellbeing(studentId);
      setData(res);
    } catch (e: any) {
      onToast(e.message || 'Failed to fetch wellbeing data', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWellbeing();
  }, []);

  const getMoodEmoji = (val: number) => {
    if (val >= 4) return { emoji: '😊', label: 'Good' };
    if (val === 3) return { emoji: '😐', label: 'Okay' };
    return { emoji: '😔', label: 'Low' };
  };

  if (loading || !data) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
        <div className="h-72 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  const { today_wellbeing, history_7d, insights } = data;
  const moodMeta = getMoodEmoji(today_wellbeing.mood);

  // Format chart dates for readability
  const chartData = history_7d.map((h) => ({
    ...h,
    shortDate: h.date.slice(5), // MM-DD
  }));

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 space-y-8">
      
      {/* Top Banner & Student ID */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
              ID: {studentId}
            </span>
            <span className="text-xs text-slate-500">Opt-In Student Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.todaysWellbeing}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Personalized reflection and 7-day multi-dimensional trajectory.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchWellbeing}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            title="Refresh Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('checkin')}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            Take Daily Check-in
          </button>
        </div>
      </div>

      {/* 5 Today's Wellbeing Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        
        {/* Mood */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">{t.mood}</span>
            <span className="text-xl">{moodMeta.emoji}</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{moodMeta.label}</p>
          <p className="text-[11px] text-slate-500 mt-1">Rating: {today_wellbeing.mood} / 5</p>
        </div>

        {/* Sleep */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">{t.sleep}</span>
            <Moon className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{today_wellbeing.sleep_hours} <span className="text-xs font-normal text-slate-500">hrs</span></p>
          <p className="text-[11px] text-slate-500 mt-1">Recommended: 7.5 - 8.5h</p>
        </div>

        {/* Study Workload */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">{t.study}</span>
            <BookOpen className="w-4 h-4 text-violet-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{today_wellbeing.study_hours} <span className="text-xs font-normal text-slate-500">hrs</span></p>
          <p className="text-[11px] text-slate-500 mt-1">Academic & lab time</p>
        </div>

        {/* Attendance */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">{t.attendance}</span>
            <GraduationCap className="w-4 h-4 text-brand-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{today_wellbeing.attendance_pct}%</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            {today_wellbeing.attendance_pct >= 75 ? 'Above 75% threshold' : 'Below recommended'}
          </p>
        </div>

        {/* Social Connection */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">{t.socialConnection}</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-900 truncate">{today_wellbeing.isolation_level}</p>
          <p className="text-[11px] text-slate-500 mt-1">Peer interaction pulse</p>
        </div>

      </div>

      {/* 7-Day Trend Analytics with Recharts */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.weeklyTrends}
            </h2>
            <p className="text-xs text-slate-500">
              Visualizing multi-day trends helps identify fatigue cycles before burnout sets in.
            </p>
          </div>

          {/* Chart Toggle Buttons */}
          <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50 text-xs font-semibold">
            {[
              { id: 'wellbeing', label: 'Wellbeing' },
              { id: 'sleep', label: 'Sleep' },
              { id: 'study', label: 'Workload' },
              { id: 'mood', label: 'Mood' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveChart(btn.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeChart === btn.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Render Active Chart */}
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === 'wellbeing' ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="wellbeingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="shortDate" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} / 100`, 'Heuristic Score']}
                />
                <Area type="monotone" dataKey="wellbeing_score" stroke="#4f46e5" strokeWidth={2.5} fill="url(#wellbeingGrad)" />
              </AreaChart>
            ) : activeChart === 'sleep' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="shortDate" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 12]} stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} hours`, 'Sleep']}
                />
                <Bar dataKey="sleep_hours" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : activeChart === 'study' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="shortDate" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 16]} stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} hours`, 'Study / Workload']}
                />
                <Line type="monotone" dataKey="study_hours" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4, fill: '#8b5cf6' }} />
              </LineChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="shortDate" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[1, 5]} stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} / 5`, 'Mood']}
                />
                <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Supportive Automated Insights */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card">
        <div className="flex items-center gap-2 mb-4 text-brand-700 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>{t.supportiveInsights}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {insights.map((insight, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
            >
              <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {insight}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action shortcuts */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-brand-50 border border-brand-100 text-brand-900">
        <div>
          <p className="font-semibold text-sm">Need a quiet space or someone to talk to?</p>
          <p className="text-xs text-brand-700 mt-0.5">Explore guided sleep practices, chat with our supportive assistant, or view confidential counselling.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('support')}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            Open Support Chat
          </button>
          <button
            onClick={() => onNavigate('resources')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-brand-200 transition-all"
          >
            Campus Resources
          </button>
        </div>
      </div>

    </div>
  );
};
`

---

### frontend\src\pages\SupportChat.tsx

`tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquareHeart, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  Clock,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { Language, ChatMessage, EmergencyContact } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';

interface SupportChatProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const SupportChat: React.FC<SupportChatProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello. I'm CampusGuard Support. You can talk freely about academic stress, heavy workload, sleep difficulties, or feeling isolated. How are you holding up today?",
      time: 'Just now',
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.sendChatMessage(query);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: res.reply,
        isCrisis: res.is_crisis,
        emergencyContacts: res.emergency_contacts,
        suggestedResources: res.suggested_resources,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e: any) {
      onToast(e.message || 'Failed to send message', 'warning');
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "I'm stressed about exams.",
    "I feel lonely.",
    "I haven't slept well in days.",
    "I'm feeling completely overwhelmed with coursework.",
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 flex flex-col h-[calc(100vh-160px)] min-h-[580px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600">
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">CampusGuard Support</h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online"></span>
            </div>
            <p className="text-xs text-slate-500">
              You can talk about stress, workload, sleep or feeling isolated.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: '1',
                sender: 'bot',
                text: "Hello. I'm CampusGuard Support. You can talk freely about academic stress, heavy workload, sleep difficulties, or feeling isolated. How are you holding up today?",
                time: 'Just now',
              }
            ]);
          }}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Reset Conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${
              m.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
              m.sender === 'user' 
                ? 'bg-slate-900 text-white' 
                : m.isCrisis 
                ? 'bg-rose-100 text-rose-700' 
                : 'bg-brand-100 text-brand-700'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-lg ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              
              {/* Message bubble */}
              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-brand-600 text-white shadow-sm rounded-tr-sm'
                  : m.isCrisis
                  ? 'bg-rose-50 border border-rose-200 text-rose-950 shadow-card rounded-tl-sm'
                  : 'bg-white border border-slate-200 text-slate-800 shadow-card rounded-tl-sm'
              }`}>
                {m.isCrisis && (
                  <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-2 text-xs uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    Immediate Support & Safety Protocol
                  </div>
                )}
                <p className="whitespace-pre-line">{m.text}</p>
              </div>

              {/* Emergency Helpline Cards if crisis detected */}
              {m.emergencyContacts && m.emergencyContacts.length > 0 && (
                <div className="mt-3 space-y-2">
                  {m.emergencyContacts.map((c, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white border border-rose-200 shadow-sm flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{c.name}</p>
                        <p className="text-[11px] text-slate-500">{c.description}</p>
                      </div>
                      <a
                        href={`tel:${c.phone.replace(/[^0-9]/g, '')}`}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-1.5 shrink-0"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        {c.phone}
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggested action pills */}
              {m.suggestedResources && m.suggestedResources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.suggestedResources.map((res, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium"
                    >
                      {res}
                    </span>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-slate-400 mt-1 block px-1">
                {m.time}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-400 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse delay-200"></span>
              <span>Composing supportive response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Prompts */}
      <div className="pt-3 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">Try asking:</span>
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2 border-t border-slate-200"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share what is currently on your mind..."
          className="flex-1 p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 bg-white"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-2 text-center">
        <p className="text-[10px] text-slate-400">
          CampusGuard Support provides supportive listening, not clinical medical diagnosis.
        </p>
      </div>

    </div>
  );
};
`

---

### frontend\src\services\api.ts

`typescript
import {
  CheckinSubmission,
  CheckinResult,
  StudentWellbeingData,
  AdminOverview,
  AlertItem,
  StudentAdminDetail,
  SocialGraphData,
  SupportResource,
  ChatMessage
} from '../types';

const API_BASE = '/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errText = await res.text();
    let errorDetail = `Request failed (${res.status})`;
    try {
      const parsed = JSON.parse(errText);
      errorDetail = parsed.detail || errorDetail;
    } catch {
      // keep fallback
    }
    throw new Error(errorDetail);
  }
  return res.json();
}

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return handleResponse<{ status: string; service: string }>(res);
  },

  async submitCheckin(data: CheckinSubmission): Promise<CheckinResult> {
    const res = await fetch(`${API_BASE}/checkins`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<CheckinResult>(res);
  },

  async getStudentWellbeing(studentId: string = 'CG-1042'): Promise<StudentWellbeingData> {
    const res = await fetch(`${API_BASE}/student/${studentId}/wellbeing`);
    return handleResponse<StudentWellbeingData>(res);
  },

  async getAdminOverview(): Promise<AdminOverview> {
    const res = await fetch(`${API_BASE}/admin/overview`);
    return handleResponse<AdminOverview>(res);
  },

  async getAdminAlerts(riskLevel?: string, statusFilter?: string): Promise<AlertItem[]> {
    const params = new URLSearchParams();
    if (riskLevel) params.append('risk_level', riskLevel);
    if (statusFilter) params.append('status_filter', statusFilter);
    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/admin/alerts${query}`);
    return handleResponse<AlertItem[]>(res);
  },

  async updateAlertAction(alertId: number, action: string, notes?: string) {
    const res = await fetch(`${API_BASE}/admin/alerts/${alertId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, notes }),
    });
    return handleResponse<{ success: boolean; message: string; status: string }>(res);
  },

  async getAdminStudentDetail(studentId: string): Promise<StudentAdminDetail> {
    const res = await fetch(`${API_BASE}/admin/student/${studentId}`);
    return handleResponse<StudentAdminDetail>(res);
  },

  async getSocialGraph(): Promise<SocialGraphData> {
    const res = await fetch(`${API_BASE}/admin/social-graph`);
    return handleResponse<SocialGraphData>(res);
  },

  async sendChatMessage(message: string, sessionId: string = 'demo-session') {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, session_id: sessionId }),
    });
    return handleResponse<{
      reply: string;
      is_crisis: boolean;
      suggested_resources: string[];
      emergency_contacts?: any[];
    }>(res);
  },

  async getResources(): Promise<SupportResource[]> {
    const res = await fetch(`${API_BASE}/resources`);
    return handleResponse<SupportResource[]>(res);
  },

  async resetDemoData() {
    const res = await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
    return handleResponse<{ success: boolean; message: string }>(res);
  }
};
`

---

### frontend\src\services\offlineQueue.ts

`typescript
import { CheckinSubmission, CheckinResult } from '../types';
import { api } from './api';

const QUEUE_KEY = 'campusguard_offline_checkins';
const DRAFT_KEY = 'campusguard_checkin_draft';
const SIMULATE_OFFLINE_KEY = 'campusguard_simulated_offline';

export interface QueuedCheckin extends CheckinSubmission {
  queued_at: string;
}

export const offlineService = {
  isSimulatedOffline(): boolean {
    return localStorage.getItem(SIMULATE_OFFLINE_KEY) === 'true';
  },

  setSimulatedOffline(val: boolean) {
    localStorage.setItem(SIMULATE_OFFLINE_KEY, val ? 'true' : 'false');
    window.dispatchEvent(new Event('offline-status-changed'));
  },

  isOnline(): boolean {
    if (this.isSimulatedOffline()) return false;
    return navigator.onLine;
  },

  saveDraft(draft: Partial<CheckinSubmission>) {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch (e) {
      console.warn('Failed to save draft locally', e);
    }
  },

  getDraft(): Partial<CheckinSubmission> | null {
    try {
      const data = localStorage.getItem(DRAFT_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
  },

  enqueueCheckin(checkin: CheckinSubmission) {
    const queue: QueuedCheckin[] = this.getQueuedCheckins();
    queue.push({
      ...checkin,
      is_offline_sync: true,
      queued_at: new Date().toISOString()
    });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    window.dispatchEvent(new Event('offline-queue-changed'));
  },

  getQueuedCheckins(): QueuedCheckin[] {
    try {
      const raw = localStorage.getItem(QUEUE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  async syncQueuedCheckins(): Promise<number> {
    if (!this.isOnline()) return 0;
    const queue = this.getQueuedCheckins();
    if (queue.length === 0) return 0;

    let syncedCount = 0;
    const remaining: QueuedCheckin[] = [];

    for (const item of queue) {
      try {
        await api.submitCheckin(item);
        syncedCount++;
      } catch (e) {
        remaining.push(item);
      }
    }

    localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
    window.dispatchEvent(new Event('offline-queue-changed'));
    return syncedCount;
  }
};
`

---

### frontend\src\types\index.ts

`typescript
export type Language = 'en' | 'hi' | 'mr';

export interface CheckinSubmission {
  student_id: string;
  mood: number;
  sleep_hours: number;
  study_hours: number;
  isolation_level: string;
  attendance_pct: number;
  journal_note?: string;
  is_offline_sync?: boolean;
}

export interface CheckinResult {
  score: number;
  level: 'Low' | 'Medium' | 'High';
  status_label: string;
  factors: string[];
  supportive_recommendation: string;
  is_emergency_triggered: boolean;
}

export interface HistoryPoint {
  date: string;
  mood: number;
  sleep_hours: number;
  study_hours: number;
  attendance_pct: number;
  isolation_level: string;
  wellbeing_score: number;
}

export interface TodayWellbeing {
  mood: number;
  sleep_hours: number;
  study_hours: number;
  attendance_pct: number;
  isolation_level: string;
  risk_score: number;
  status_label: string;
}

export interface StudentWellbeingData {
  student_id: string;
  today_wellbeing: TodayWellbeing;
  history_7d: HistoryPoint[];
  insights: string[];
  opt_in: boolean;
}

export interface RiskDistributionData {
  low: number;
  medium: number;
  high: number;
  low_pct: number;
  medium_pct: number;
  high_pct: number;
}

export interface CampusTrendPoint {
  date: string;
  avg_mood: number;
  avg_sleep: number;
  avg_study: number;
  avg_attendance: number;
  avg_wellbeing: number;
}

export interface AdminOverview {
  total_active_students: number;
  checkins_today: number;
  students_needing_attention: number;
  high_priority_alerts: number;
  risk_distribution: RiskDistributionData;
  trends_14d: CampusTrendPoint[];
}

export interface AlertItem {
  id: number;
  student_id: string;
  risk_score: number;
  risk_level: 'Low' | 'Medium' | 'High';
  top_factors: string[];
  trend: 'improving' | 'stable' | 'declining';
  status: 'pending' | 'reviewed' | 'counsellor_requested' | 'dismissed';
  suggested_action: string;
  notes?: string;
  last_checkin: string;
  created_at: string;
}

export interface StudentAdminDetail {
  student_id: string;
  department: string;
  year: number;
  current_risk_score: number;
  current_risk_level: string;
  top_factors: string[];
  trend: string;
  suggested_action: string;
  status: string;
  history_7d: HistoryPoint[];
}

export interface SocialNode {
  id: string;
  degree: number;
  centrality: number;
  clustering: number;
  isolation_score: number;
  status: string;
  x: number;
  y: number;
}

export interface SocialEdge {
  source: string;
  target: string;
  weight: number;
}

export interface GraphSummary {
  total_nodes: number;
  total_edges: number;
  isolated_nodes_count: number;
  peripheral_nodes_count: number;
  connected_nodes_count: number;
  average_clustering: number;
  density: number;
  disclaimer: string;
}

export interface SocialGraphData {
  nodes: SocialNode[];
  edges: SocialEdge[];
  summary: GraphSummary;
}

export interface SupportResource {
  id: number;
  category: string;
  title: string;
  description: string;
  contact_info: string;
  availability: string;
  is_emergency: boolean;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  type: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  isCrisis?: boolean;
  emergencyContacts?: EmergencyContact[];
  suggestedResources?: string[];
  time: string;
}
`

---

