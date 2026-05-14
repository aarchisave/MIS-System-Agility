@echo off
echo Starting Agility Food Products MIS Dashboard...

echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo Application launched!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
