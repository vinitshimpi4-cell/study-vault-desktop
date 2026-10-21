@echo off
rem Fallback: opens StudyVault in its own app-style window using Edge or Chrome. No Node.js needed.
set "P=%~dp0app\StudyVault.html"
set "U=file:///%P:\=/%"
start "" msedge --app="%U%" 2>nul || start "" chrome --app="%U%"
