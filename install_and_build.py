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
