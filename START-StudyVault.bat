@echo off
rem Runs StudyVault as a desktop app. Needs Node.js (https://nodejs.org) installed once.
cd /d "%~dp0"
if not exist node_modules (
  echo Installing Electron - first run only, needs internet...
  call npm install
)
call npm start
