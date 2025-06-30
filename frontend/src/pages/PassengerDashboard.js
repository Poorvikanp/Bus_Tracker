import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PassengerDashboard.css';

function PassengerDashboard() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBuses();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchBuses, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/bus');
      setBuses(response.data.data || response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bus data');
      console.error('Error fetching buses:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'On Time': return 'status-badge status-ontime';
      case 'Delayed': return 'status-badge status-delayed';
      case 'Cancelled': return 'status-badge status-cancelled';
      case 'Departed': return 'status-badge status-departed';
      case 'Arrived': return 'status-badge status-arrived';
      default: return 'status-badge status-ontime';
    }
  };

  const filteredBuses = buses.filter(bus => {
    const matchesDirection = selectedDirection === 'all' || bus.direction === selectedDirection;
    const matchesSearch = bus.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.currentLocation?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDirection && matchesSearch;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading bus information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>❌ {error}</p>
        <button className="btn btn-primary" onClick={fetchBuses}>Retry</button>
      </div>
    );
  }

  return (
    <div className="passenger-dashboard">
      <div className="dashboard-header">
        <h1>🚌 Bus Tracker - Thirthahalli ↔ Shivamogga</h1>
        <p>Real-time bus information and live status updates</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label className="form-label">Direction:</label>
          <select 
            className="form-select" 
            value={selectedDirection} 
            onChange={(e) => setSelectedDirection(e.target.value)}
          >
            <option value="all">All Directions</option>
            <option value="Thirthahalli-Shivamogga">Thirthahalli → Shivamogga</option>
            <option value="Shivamogga-Thirthahalli">Shivamogga → Thirthahalli</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="form-label">Search:</label>
          <input
            type="text"
            className="form-input"
            placeholder="Search by bus name, number, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={fetchBuses}>
          🔄 Refresh
        </button>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h3>Total Buses</h3>
          <p>{filteredBuses.length}</p>
        </div>
        <div className="stat-card">
          <h3>On Time</h3>
          <p>{filteredBuses.filter(bus => bus.status === 'On Time').length}</p>
        </div>
        <div className="stat-card">
          <h3>Delayed</h3>
          <p>{filteredBuses.filter(bus => bus.status === 'Delayed').length}</p>
        </div>
        <div className="stat-card">
          <h3>Cancelled</h3>
          <p>{filteredBuses.filter(bus => bus.status === 'Cancelled').length}</p>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Bus Name/No</th>
              <th>Direction</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Current Location</th>
              <th>Status</th>
              <th>Delay</th>
              <th>Route</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuses.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No buses found matching your criteria
                </td>
              </tr>
            ) : (
              filteredBuses.map(bus => (
                <tr key={bus._id}>
                  <td>
                    <strong>{bus.name || bus.number}</strong>
                    {bus.number && (
                      <span>
                        <br />
                        <small>Govt: {bus.number}</small>
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="direction-badge">
                      {bus.direction === 'Thirthahalli-Shivamogga' ? '🔄 Thirthahalli → Shivamogga' : '🔄 Shivamogga → Thirthahalli'}
                    </span>
                  </td>
                  <td>{bus.departure}</td>
                  <td>{bus.arrival}</td>
                  <td>
                    {bus.currentLocation ? (
                      <span className="location-text">📍 {bus.currentLocation}</span>
                    ) : (
                      <span className="location-text">📍 Not updated</span>
                    )}
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(bus.status)}>
                      {bus.status}
                    </span>
                  </td>
                  <td>
                    {bus.delayMinutes > 0 ? (
                      <span className="delay-text">⏰ +{bus.delayMinutes} min</span>
                    ) : (
                      <span className="delay-text">✅ On time</span>
                    )}
                  </td>
                  <td>
                    <div className="route-info">
                      <details>
                        <summary>View Route</summary>
                        <div className="route-stops">
                          {bus.route && bus.route.map((stop, index) => (
                            <div key={index} className="route-stop">
                              {index + 1}. {stop}
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="info-section">
        <div className="card">
          <h3>📍 Route Information</h3>
          <div className="route-map">
            <div className="route-line">
              <div className="route-stop">Thirthahalli Bus Stand</div>
              <div className="route-arrow">→</div>
              <div className="route-stop">Kudumallige</div>
              <div className="route-arrow">→</div>
              <div className="route-stop">Bejjavalli</div>
              <div className="route-arrow">→</div>
              <div className="route-stop">Malur</div>
              <div className="route-arrow">→</div>
              <div className="route-stop">Tuduru</div>
              <div className="route-arrow">→</div>
              <div className="route-stop">Mandagadde</div>
              <div className="route-arrow">→</div>
              <div className="route-stop">Sakrebailu 🐘</div>
              <div className="route-arrow">→</div>
              <div className="route-stop">Gajanuru</div>
              <div className="route-arrow">→</div>
              <div className="route-stop">Shivamogga KSRTC Bus Stand</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerDashboard;