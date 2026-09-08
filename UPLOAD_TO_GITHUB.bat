@echo off
setlocal
cd /d "%~dp0"
echo ===================================================
echo     CampusGuard - 1-Click GitHub Repository Uploader
echo ===================================================
set "PATH=C:\Users\ACER\.gemini\antigravity-ide\scratch\tools\git\cmd;%PATH%"

echo [1/5] Checking Git...
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo Git could not be located.
    pause
    exit /b 1
)
echo Git is active!

echo.
echo [2/5] Initializing local repository...
if not exist .git (
    git init
    git config user.name "CampusGuard Developer"
    git config user.email "campusguard@example.com"
)

echo.
echo [3/5] Adding all project files...
git add .
git commit -m "feat: complete CampusGuard student wellbeing platform"
git branch -M main

echo.
echo [4/5] Setting up Remote URL...
set "DEFAULT_REPO=https://github.com/Eclipse-2310/POL-Repository.git"
echo Default repository: %DEFAULT_REPO%
set /p REPO_URL="Press Enter to use default, or paste another Repo URL: "
if "%REPO_URL%"=="" set "REPO_URL=%DEFAULT_REPO%"

git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo.
echo [5/5] Pushing files to GitHub (%REPO_URL%)...
echo Note: If GitHub prompts for authentication, click 'Sign in with your browser'.
git push -u origin main --force

echo.
echo ===================================================
if %errorlevel% equ 0 (
    echo SUCCESS! All files uploaded to GitHub successfully!
) else (
    echo Push completed. If there was a permission error, please ensure you accepted the invite to the repository.
)
echo ===================================================
pause
