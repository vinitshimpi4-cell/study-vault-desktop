@echo off
rem Starts a tiny local web server (needs Python) and opens StudyVault so Chrome/Edge can INSTALL it as an app.
cd /d "%~dp0pwa"
start "" http://localhost:8765/
py -m http.server 8765 2>nul || python -m http.server 8765
