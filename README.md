# Bus Tracker - Thirthahalli ↔ Shivamogga

A real-time bus tracking system for the Thirthahalli to Shivamogga route and vice versa.

## Features

### For Passengers:
- View all bus timings and schedules
- Real-time bus status updates
- Current location tracking
- Delay notifications
- Route information

### For Conductors/Drivers:
- Login dashboard
- Update bus status and location
- Mark delays or cancellations
- Real-time location updates

## Technology Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Authentication:** JWT

## Project Structure

```
bus-tracker/
├── backend/
│   ├── controllers/
│   │   ├── busController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Bus.js
│   │   └── User.js
│   ├── routes/
│   │   ├── bus.js
│   │   └── user.js
│   ├── seed/
│   │   └── seedBuses.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── PassengerDashboard.js
│   │   │   ├── ConductorDashboard.js
│   │   │   └── Login.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
npm run seed  # Seed the database with bus data
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Bus Routes

### Thirthahalli → Shivamogga
- Thirthahalli Bus Stand
- Kudumallige
- Bejjavalli
- Malur
- Tuduru
- Mandagadde
- Sakrebailu (Elephant Camp)
- Gajanuru
- Shivamogga KSRTC Bus Stand

### Shivamogga → Thirthahalli
- Reverse route of above

## API Endpoints

- `GET /api/bus` - Get all buses
- `GET /api/bus/:id` - Get specific bus
- `POST /api/bus/update/:id` - Update bus status
- `POST /api/user/login` - User login

## Usage

1. Open http://localhost:3000 for passenger view
2. Navigate to Conductor/Driver section for status updates
3. Use the login system for authenticated updates

## Environment Variables

Create a `.env` file in the backend directory:
```
MONGO_URI=mongodb://localhost:27017/bus-tracker
JWT_SECRET=your_secret_key
``` 