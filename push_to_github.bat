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
