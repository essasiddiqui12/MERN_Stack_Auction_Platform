#!/bin/bash

echo "========================================"
echo "MERN Stack Auction Platform - Network Setup"
echo "========================================"
echo

echo "Finding your IP address..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac
    IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
else
    # Linux
    IP=$(hostname -I | awk '{print $1}')
fi

echo "Your IP Address: $IP"
echo

echo "========================================"
echo "SETUP INSTRUCTIONS:"
echo "========================================"
echo "1. Update frontend/.env file:"
echo "   Change VITE_API_URL=http://localhost:4005"
echo "   To:    VITE_API_URL=http://$IP:4005"
echo
echo "2. Share this URL with other users:"
echo "   http://$IP:5173"
echo
echo "3. Press Enter to continue after updating the .env file..."
read -p ""

echo
echo "Starting Backend Server (Network Mode)..."
cd backend
npm run dev:network &
BACKEND_PID=$!

echo "Waiting 5 seconds for backend to start..."
sleep 5

echo "Starting Frontend Server (Network Mode)..."
cd ../frontend
npm run dev:network &
FRONTEND_PID=$!

echo
echo "========================================"
echo "SERVERS RUNNING..."
echo "========================================"
echo "Backend:  http://$IP:4005"
echo "Frontend: http://$IP:5173"
echo "Local:    http://localhost:5173"
echo
echo "Press Ctrl+C to stop both servers"
echo "========================================"

# Function to cleanup on exit
cleanup() {
    echo
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "Servers stopped."
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait
