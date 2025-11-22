@echo off
echo ========================================
echo MERN Stack Auction Platform - Network Setup
echo ========================================
echo.

echo Finding your IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set "ip=%%a"
    goto :found
)
:found
set ip=%ip: =%
echo Your IP Address: %ip%
echo.

echo ========================================
echo SETUP INSTRUCTIONS:
echo ========================================
echo 1. Update frontend/.env file:
echo    Change VITE_API_URL=http://localhost:4005
echo    To:    VITE_API_URL=http://%ip%:4005
echo.
echo 2. Share this URL with other users:
echo    http://%ip%:5173
echo.
echo 3. Press any key to continue after updating the .env file...
pause
echo.

echo Starting Backend Server (Network Mode)...
start "Backend Server" cmd /k "cd backend && npm run dev:network"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server (Network Mode)...
start "Frontend Server" cmd /k "cd frontend && npm run dev:network"

echo.
echo ========================================
echo SERVERS STARTING...
echo ========================================
echo Backend:  http://%ip%:4005
echo Frontend: http://%ip%:5173
echo Local:    http://localhost:5173
echo.
echo Both servers are starting in separate windows.
echo Close this window when you're done.
echo ========================================

pause
