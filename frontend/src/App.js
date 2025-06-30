import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PassengerDashboard from './pages/PassengerDashboard';
import ConductorDashboard from './pages/ConductorDashboard';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              🚌 Bus Tracker
            </div>
            <div className="nav-links">
              <Link to="/" className="nav-link">Passenger View</Link>
              <Link to="/conductor" className="nav-link">Conductor/Driver</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </div>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<PassengerDashboard />} />
            <Route path="/conductor" element={<ConductorDashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 