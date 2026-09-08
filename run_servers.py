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
