# MERN Stack Auction Platform - Network Access Setup Guide

This guide will help you set up the auction platform so that it can be accessed by other users on your network or over the internet.

## Quick Start (Local Network Access)

### 1. Find Your IP Address

**Windows:**
```bash
ipconfig
```
Look for your IPv4 Address (e.g., 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig
# or
ip addr show
```

### 2. Start Backend (Network Mode)
```bash
cd backend
npm run dev:network
```
This will start the backend server accessible from any IP address on port 4004.

### 3. Update Frontend Configuration
Edit `frontend/.env` file:
```env
# Replace YOUR_IP_ADDRESS with your actual IP address
VITE_API_URL=http://YOUR_IP_ADDRESS:4004
```
Example:
```env
VITE_API_URL=http://192.168.1.100:4004
```

### 4. Start Frontend (Network Mode)
```bash
cd frontend
npm run dev:network
```
This will start the frontend accessible from any IP address on port 5173.

## Access URLs

Once both servers are running:
- **Frontend**: `http://YOUR_IP_ADDRESS:5173`
- **Backend API**: `http://YOUR_IP_ADDRESS:4004`
- **Local access**: `http://localhost:5173` (still works)

## For Other Users

Share these URLs with other users on your network:
- **Main Application**: `http://YOUR_IP_ADDRESS:5173`

Replace `YOUR_IP_ADDRESS` with your actual IP address (e.g., `http://192.168.1.100:5173`)

## Database Access

The MongoDB database is already configured to work from anywhere since it's hosted on MongoDB Atlas cloud service. No additional configuration needed.

## Firewall Configuration

If users can't access the application, you may need to configure your firewall:

**Windows Firewall:**
1. Open Windows Defender Firewall
2. Click "Allow an app or feature through Windows Defender Firewall"
3. Click "Change Settings" then "Allow another app"
4. Add Node.js or allow ports 4004 and 5173

**Mac:**
```bash
# Allow incoming connections on ports
sudo pfctl -f /etc/pf.conf
```

**Linux (Ubuntu):**
```bash
sudo ufw allow 4004
sudo ufw allow 5173
```

## Production Deployment

For production deployment, consider:
1. Using environment variables for configuration
2. Setting up proper SSL certificates
3. Using a reverse proxy (nginx)
4. Setting `NODE_ENV=production` in backend

## Troubleshooting

### Common Issues:

1. **Can't access from other devices:**
   - Check firewall settings
   - Ensure you're using the correct IP address
   - Make sure both frontend and backend are running in network mode

2. **CORS errors:**
   - The backend is configured to allow all origins in development
   - Check that `ALLOW_ALL_ORIGINS=true` is set

3. **API calls failing:**
   - Verify the `VITE_API_URL` in frontend/.env matches your backend IP and port
   - Check that backend is running on the expected port

### Checking if servers are accessible:

Test backend API:
```bash
curl http://YOUR_IP_ADDRESS:4004/api/v1/user/leaderboard
```

Test frontend:
Open `http://YOUR_IP_ADDRESS:5173` in a browser

## Security Notes

- This setup allows all origins for development convenience
- For production, configure specific allowed origins in `backend/config/config.env`
- Consider using HTTPS in production
- The current setup is suitable for local network access and development

## Alternative: Using ngrok for Internet Access

For internet access without port forwarding:

1. Install ngrok: https://ngrok.com/
2. Start your servers locally
3. In separate terminals:
```bash
# Expose backend
ngrok http 4004

# Expose frontend  
ngrok http 5173
```
4. Update frontend/.env with the ngrok backend URL
5. Share the ngrok frontend URL with users
