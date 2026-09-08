# 🛡️ CampusGuard — Complete Project Guide

> **Opt-In AI-Powered Student Wellbeing Early-Warning Platform**  
> Hackathon Prototype • Non-Diagnostic Heuristic Risk Engine • NetworkX Social Isolation Graph

---

## ⚡ 1. Direct 1-Click Run (No Blank Page!)

### Why was `frontend/index.html` showing a blank page earlier?
Vite/React projects use `<script type="module" src="/src/main.tsx">`. When you double-click an HTML file directly in Windows Explorer, the browser loads it via `file:///` protocol. **Modern web browsers (Chrome, Edge) strictly block ES modules on `file:///` URLs due to CORS security policies.**

### How it is fixed now:
In this folder:
- **`index.html` (in root)** and **`frontend/index.html`** are configured with **standalone React 18, Babel CDN, and Tailwind CSS**.
- **Just double-click `index.html`** (or `frontend/index.html`) directly!
- It will open in Google Chrome or Microsoft Edge and load **instantly with 0 blank screen**, zero node.js needed, and zero python needed!

---

## 📁 2. Folder Structure & Files

```
CampusGuard_Final/
├── index.html                  <-- Double-click to open working app directly in browser!
├── ALL_PROJECT_FILES.md        <-- All frontend & backend code in a single readable document
├── README.md                   <-- This guide
│
├── frontend/                   <-- Complete React + TypeScript Frontend
│   ├── index.html              <-- Direct double-clickable HTML (zero blank screen)
│   ├── vite_index.html         <-- Original Vite template (for npm run dev)
│   ├── package.json            <-- Dependencies list
│   ├── tailwind.config.js      <-- Tailwind styling configuration
│   └── src/
│       ├── main.tsx            <-- React entrypoint
│       ├── App.tsx             <-- Main navigation & routing
│       ├── types/index.ts      <-- TypeScript data models
│       ├── services/api.ts     <-- REST API client
│       ├── services/offlineQueue.ts <-- IndexedDB offline sync
│       ├── i18n/translations.ts <-- English, Hindi, Marathi
│       ├── pages/
│       │   ├── LandingPage.tsx
│       │   ├── DailyCheckIn.tsx (5-step interactive check-in)
│       │   ├── StudentDashboard.tsx (Wellbeing charts)
│       │   ├── AdminDashboard.tsx (Triage table & alerts)
│       │   ├── AlertDetailPanel.tsx (Slide-over drawer)
│       │   ├── SocialGraphPage.tsx (NetworkX peer graph)
│       │   ├── SupportChat.tsx (Empathetic AI + Crisis triage)
│       │   ├── ResourcesPage.tsx (Tele-MANAS 14416 / KIRAN)
│       │   └── PrivacyCenter.tsx (6 core privacy pillars)
│       └── components/
│           ├── Navbar.tsx
│           ├── StatCard.tsx
│           ├── Toast.tsx
│           └── DemoBanner.tsx
│
└── backend/                    <-- Complete Python FastAPI Backend
    ├── main.py                 <-- REST endpoints & CORS
    ├── risk_engine.py          <-- Heuristic risk scoring engine
    ├── social_graph.py         <-- NetworkX social isolation graph
    ├── chatbot.py              <-- Empathetic chat + crisis keyword triage
    ├── models.py               <-- SQLAlchemy database models
    ├── schemas.py              <-- Pydantic validation schemas
    ├── database.py             <-- SQLite database connection
    ├── seed.py                 <-- 35+ synthetic demo students & 14-day history
    ├── campusguard.db          <-- Pre-seeded SQLite database
    ├── requirements.txt        <-- Python dependencies
    └── test_api.py             <-- 10 automated test suites
```

---

## 🚀 3. How to Run Backend (Optional)

If you want to run the live FastAPI backend server:

1. Open PowerShell or Command Prompt in the `backend/` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the server:
   ```bash
   python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```
4. Open the interactive API documentation:
   👉 **http://127.0.0.1:8000/docs**

---

## 🔍 4. How to Inspect & Edit Code

- To view or edit frontend code: Open `frontend/src/` in VS Code or any text editor.
- To view or edit backend code: Open `backend/` in VS Code or any text editor.
- To view all code in one place: Open `ALL_PROJECT_FILES.md`.
