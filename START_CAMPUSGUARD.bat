@echo off
title CampusGuard Launcher
echo ========================================================
echo               Launching CampusGuard...
echo ========================================================
echo.
cd /d "%~dp0backend"

echo Opening browser at http://127.0.0.1:8000/...
start "" "http://127.0.0.1:8000/"

echo Starting Backend Server on port 8000...
python -m uvicorn main:app --host 127.0.0.1 --port 8000

pause
