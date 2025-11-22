# 🌐 MERN Stack Auction Platform - Network Access Setup

This project has been configured for **network access**, allowing multiple users to access the auction platform from different devices on the same network or over the internet.

## 🚀 Quick Start

### Option 1: Automatic Setup (Recommended)

**Windows Users:**
```bash
# Double-click or run:
start-network.bat
```

**Mac/Linux Users:**
```bash
# Make executable and run:
chmod +x start-network.sh
./start-network.sh
```

### Option 2: Manual Setup

1. **Find your IP address:**
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` or `ip addr show`

2. **Update frontend configuration:**
   Edit `frontend/.env`:
   ```env
   VITE_API_URL=http://YOUR_IP_ADDRESS:4004
   ```

3. **Start servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev:network
   
   # Terminal 2 - Frontend  
   cd frontend
   npm run dev:network
   ```

## 📱 Access URLs

- **Main Application**: `http://YOUR_IP_ADDRESS:5173`
- **API Endpoint**: `http://YOUR_IP_ADDRESS:4004`
- **Local Access**: `http://localhost:5173` (still works)

## 🔧 What's Been Configured

### Backend Changes:
- ✅ Server binds to `0.0.0.0` (all network interfaces)
- ✅ CORS configured for cross-origin requests
- ✅ Environment variables for network access
- ✅ New npm scripts: `dev:network`, `start:network`

### Frontend Changes:
- ✅ Vite configured for network access
- ✅ Environment variables for API URL configuration
- ✅ New npm scripts: `dev:network`, `preview:network`
- ✅ Proxy configuration for API calls

### Database:
- ✅ MongoDB Atlas (cloud) - works from anywhere
- ✅ No additional configuration needed

## 🛡️ Security & Firewall

The application is configured to allow all origins in development mode for ease of use. 

**If users can't access the application:**

**Windows:**
1. Windows Defender Firewall → Allow an app
2. Add Node.js or allow ports 4004 and 5173

**Mac:**
```bash
sudo pfctl -f /etc/pf.conf
```

**Linux:**
```bash
sudo ufw allow 4004
sudo ufw allow 5173
```

## 🌍 Internet Access (Optional)

For internet access without port forwarding, use ngrok:

1. Install [ngrok](https://ngrok.com/)
2. Start your servers locally
3. Expose ports:
   ```bash
   ngrok http 4004  # Backend
   ngrok http 5173  # Frontend
   ```
4. Update frontend/.env with ngrok backend URL
5. Share ngrok frontend URL

## 📋 Available Scripts

### Backend:
- `npm run dev` - Local development
- `npm run dev:network` - Network accessible development
- `npm run start` - Production local
- `npm run start:network` - Production network accessible

### Frontend:
- `npm run dev` - Local development
- `npm run dev:network` - Network accessible development
- `npm run build` - Build for production
- `npm run preview:network` - Preview build with network access

## 🔍 Troubleshooting

### Common Issues:

1. **Can't access from other devices:**
   - Check firewall settings
   - Verify IP address is correct
   - Ensure both servers are running in network mode

2. **CORS errors:**
   - Backend is configured to allow all origins in development
   - Check `ALLOW_ALL_ORIGINS=true` in backend config

3. **API calls failing:**
   - Verify `VITE_API_URL` in frontend/.env
   - Check backend is running on expected port

### Testing Connectivity:

**Test Backend API:**
```bash
curl http://YOUR_IP_ADDRESS:4004/api/v1/user/leaderboard
```

**Test Frontend:**
Open `http://YOUR_IP_ADDRESS:5173` in browser

## 📁 Configuration Files

- `backend/config/config.env` - Backend environment variables
- `frontend/.env` - Frontend environment variables
- `backend/clean-server.js` - Server configuration
- `frontend/vite.config.js` - Vite configuration

## 🎯 Production Notes

For production deployment:
- Set `NODE_ENV=production`
- Configure specific allowed origins
- Use HTTPS with SSL certificates
- Consider using a reverse proxy (nginx)
- Set up proper monitoring and logging

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify all configuration files
3. Ensure all dependencies are installed
4. Check firewall and network settings

---

**Happy Bidding! 🎉**
