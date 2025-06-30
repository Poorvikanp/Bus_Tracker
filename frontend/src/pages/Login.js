import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    name: '',
    role: 'conductor',
    phone: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      
      const response = await axios.post('/api/user/login', form);
      
      if (response.data.success) {
        setMessage('✅ Login successful!');
        // Store token in localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Redirect to conductor dashboard after a short delay
        setTimeout(() => {
          window.location.href = '/conductor';
        }, 1500);
      } else {
        setMessage('❌ Login failed');
      }
    } catch (error) {
      setMessage('❌ Login failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerForm.username || !registerForm.password || !registerForm.name) {
      setMessage('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      
      const response = await axios.post('/api/user/register', registerForm);
      
      if (response.data.success) {
        setMessage('✅ Registration successful! You can now login.');
        setIsRegister(false);
        setRegisterForm({
          username: '',
          password: '',
          name: '',
          role: 'conductor',
          phone: ''
        });
      } else {
        setMessage('❌ Registration failed');
      }
    } catch (error) {
      setMessage('❌ Registration failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 Conductor/Driver Login</h1>
          <p>Access the bus management dashboard</p>
        </div>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="login-tabs">
          <button 
            className={`tab ${!isRegister ? 'active' : ''}`}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button 
            className={`tab ${isRegister ? 'active' : ''}`}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        {!isRegister ? (
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-input"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary login-btn"
              disabled={loading}
            >
              {loading ? '🔄 Logging in...' : '🚌 Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="login-form">
            <div className="form-group">
              <label className="form-label">Full Name:</label>
              <input
                type="text"
                className="form-input"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-input"
                value={registerForm.username}
                onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                placeholder="Choose a username"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-input"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                placeholder="Choose a password"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role:</label>
              <select
                className="form-select"
                value={registerForm.role}
                onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
              >
                <option value="conductor">Conductor</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Phone (Optional):</label>
              <input
                type="tel"
                className="form-input"
                value={registerForm.phone}
                onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                placeholder="Enter your phone number"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-success login-btn"
              disabled={loading}
            >
              {loading ? '🔄 Registering...' : '📝 Register'}
            </button>
          </form>
        )}

        <div className="login-info">
          <h3>ℹ️ Demo Credentials</h3>
          <p>For testing purposes, you can use:</p>
          <ul>
            <li><strong>Username:</strong> conductor1</li>
            <li><strong>Password:</strong> password123</li>
          </ul>
          <p><small>Note: You can also register a new account using the Register tab.</small></p>
        </div>
      </div>
    </div>
  );
}

export default Login; 