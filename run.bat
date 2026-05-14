@echo off
echo Starting Agility Food Products MIS Dashboard...

echo Starting Backend Server...
cd server
start cmd /k "npm run dev"

echo Starting Frontend Server...
cd ..
start cmd /k "npm run dev"

echo Application launched!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
