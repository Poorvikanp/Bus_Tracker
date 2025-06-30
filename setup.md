# 🚌 Bus Tracker Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

## Quick Setup

### 1. Clone/Download the Project
```bash
# If you have the project files, skip this step
git clone <repository-url>
cd bus-tracker
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from env.example)
# On Windows: copy env.example .env
# On Mac/Linux: cp env.example .env

# Edit .env file with your MongoDB connection
# MONGO_URI=mongodb://localhost:27017/bus-tracker
# JWT_SECRET=your_secret_key
# PORT=5000

# Seed the database with bus data
npm run seed

# Start the server
npm start
```

### 3. Frontend Setup
```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
```

### 4. Access the Application
- **Passenger View**: http://localhost:3000
- **Conductor Dashboard**: http://localhost:3000/conductor
- **Login Page**: http://localhost:3000/login
- **Backend API**: http://localhost:5000

## Database Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/bus-tracker`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://mongodb.com/atlas
2. Create a new cluster
3. Get connection string
4. Update `.env` file with Atlas connection string

## Features

### For Passengers:
- ✅ View all bus timings
- ✅ Real-time status updates
- ✅ Current location tracking
- ✅ Delay notifications
- ✅ Route information
- ✅ Filter by direction
- ✅ Search functionality

### For Conductors/Drivers:
- ✅ Login/Register system
- ✅ Update bus status
- ✅ Update current location
- ✅ Mark delays
- ✅ Cancel trips
- ✅ View all buses

## API Endpoints

- `GET /api/bus` - Get all buses
- `GET /api/bus/direction/:direction` - Get buses by direction
- `POST /api/bus/update/:id` - Update bus status
- `POST /api/user/login` - User login
- `POST /api/user/register` - User registration

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Ensure network access (for Atlas)

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill process using the port

3. **Module Not Found**
   - Run `npm install` in both backend and frontend
   - Clear node_modules and reinstall

4. **CORS Error**
   - Backend should be running on port 5000
   - Frontend should be running on port 3000

## Demo Credentials

For testing the conductor dashboard:
- **Username**: conductor1
- **Password**: password123

Or register a new account using the Register tab.

## Project Structure

```
bus-tracker/
├── backend/                 # Node.js + Express API
│   ├── controllers/         # Request handlers
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── seed/               # Database seeding
│   └── server.js           # Main server file
├── frontend/               # React application
│   ├── src/
│   │   ├── pages/          # Main pages
│   │   ├── components/     # Reusable components
│   │   └── App.js          # Main app component
│   └── public/             # Static files
└── README.md               # Project documentation
```

## Development

### Adding New Features:
1. Backend: Add routes in `routes/`, controllers in `controllers/`
2. Frontend: Add components in `src/components/`, pages in `src/pages/`
3. Database: Update models in `backend/models/`

### Styling:
- Main styles: `frontend/src/App.css`
- Page-specific styles: `frontend/src/pages/*.css`

## Deployment

### Backend (Heroku/Netlify):
1. Set environment variables
2. Deploy to platform
3. Update frontend API URL

### Frontend (Netlify/Vercel):
1. Build: `npm run build`
2. Deploy build folder
3. Set API URL environment variable

## Support

For issues or questions:
1. Check the troubleshooting section
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check console for error messages 