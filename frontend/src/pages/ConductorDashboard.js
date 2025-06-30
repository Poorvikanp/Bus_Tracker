import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ConductorDashboard.css';

function ConductorDashboard() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    currentLocation: '',
    status: 'On Time',
    delayMinutes: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/bus');
      setBuses(response.data.data || response.data);
    } catch (error) {
      setMessage('Error fetching buses: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedBus) {
      setMessage('Please select a bus first');
      return;
    }

    try {
      setUpdating(true);
      setMessage('');
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/bus/update/${selectedBus}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        setMessage('✅ Bus status updated successfully!');
        setForm({
          currentLocation: '',
          status: 'On Time',
          delayMinutes: 0
        });
        setSelectedBus('');
        fetchBuses(); // Refresh the bus list
      } else {
        setMessage('❌ Failed to update bus status');
      }
    } catch (error) {
      setMessage('❌ Error updating bus status: ' + error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleBusSelect = (busId) => {
    setSelectedBus(busId);
    const bus = buses.find(b => b._id === busId);
    if (bus) {
      setForm({
        currentLocation: bus.currentLocation || '',
        status: bus.status || 'On Time',
        delayMinutes: bus.delayMinutes || 0
      });
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading bus information...</p>
      </div>
    );
  }

  return (
    <div className="conductor-dashboard">
      <div className="dashboard-header">
        <h1>👨‍💼 Conductor/Driver Dashboard</h1>
        <p>Update bus status and location information</p>
      </div>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="dashboard-content">
        <div className="update-section">
          <div className="card">
            <h2>🚌 Update Bus Status</h2>
            
            <div className="form-group">
              <label className="form-label">Select Bus:</label>
              <select 
                className="form-select" 
                value={selectedBus} 
                onChange={(e) => handleBusSelect(e.target.value)}
              >
                <option value="">Choose a bus...</option>
                {buses.map(bus => (
                  <option key={bus._id} value={bus._id}>
                    {bus.name || bus.number} - {bus.direction} ({bus.departure})
                  </option>
                ))}
              </select>
            </div>

            {selectedBus && (
              <div className="update-form">
                <div className="form-group">
                  <label className="form-label">Current Location:</label>
                  <select 
                    className="form-select"
                    value={form.currentLocation}
                    onChange={(e) => setForm({ ...form, currentLocation: e.target.value })}
                  >
                    <option value="">Select current location...</option>
                    <option value="Thirthahalli Bus Stand">Thirthahalli Bus Stand</option>
                    <option value="Kudumallige">Kudumallige</option>
                    <option value="Bejjavalli">Bejjavalli</option>
                    <option value="Malur">Malur</option>
                    <option value="Tuduru">Tuduru</option>
                    <option value="Mandagadde">Mandagadde</option>
                    <option value="Sakrebailu">Sakrebailu (Elephant Camp)</option>
                    <option value="Gajanuru">Gajanuru</option>
                    <option value="Shivamogga KSRTC Bus Stand">Shivamogga KSRTC Bus Stand</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status:</label>
                  <select 
                    className="form-select"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="On Time">On Time</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Departed">Departed</option>
                    <option value="Arrived">Arrived</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Delay (minutes):</label>
                  <input
                    type="number"
                    className="form-input"
                    min="0"
                    value={form.delayMinutes}
                    onChange={(e) => setForm({ ...form, delayMinutes: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>

                <button 
                  className="btn btn-success" 
                  onClick={handleUpdate}
                  disabled={updating}
                >
                  {updating ? '🔄 Updating...' : '✅ Update Status'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="buses-section">
          <div className="card">
            <h2>📋 All Buses</h2>
            <button className="btn btn-primary" onClick={fetchBuses}>
              🔄 Refresh List
            </button>
            
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Bus</th>
                    <th>Direction</th>
                    <th>Time</th>
                    <th>Current Location</th>
                    <th>Status</th>
                    <th>Delay</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map(bus => (
                    <tr 
                      key={bus._id} 
                      className={selectedBus === bus._id ? 'selected-row' : ''}
                      onClick={() => handleBusSelect(bus._id)}
                    >
                      <td>
                        <strong>{bus.name || bus.number}</strong>
                        {bus.number && (
                          <>
                            <br />
                            <small>Govt: {bus.number}</small>
                          </>
                        )}
                      </td>
                      <td>
                        <span className="direction-badge">
                          {bus.direction === 'Thirthahalli-Shivamogga' ? '🔄 Thirthahalli → Shivamogga' : '🔄 Shivamogga → Thirthahalli'}
                        </span>
                      </td>
                      <td>
                        <div>🕐 {bus.departure}</div>
                        <div>🕐 {bus.arrival}</div>
                      </td>
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
                        <small>
                          {bus.lastUpdated ? 
                            new Date(bus.lastUpdated).toLocaleString() : 
                            'Never'
                          }
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="card">
          <h3>📝 Instructions</h3>
          <ul className="instructions-list">
            <li>Select a bus from the dropdown or click on a bus in the table</li>
            <li>Update the current location, status, and delay information</li>
            <li>Click "Update Status" to save changes</li>
            <li>Changes will be immediately visible to passengers</li>
            <li>Use "Refresh List" to get the latest data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ConductorDashboard; 