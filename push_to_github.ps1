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
