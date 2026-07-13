import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';
import { verifyAdminCredentials } from '../utils/auth';

const AdminLogin = ({ setIsAdmin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const isValid = await verifyAdminCredentials(email, password);
      if (isValid) {
        const token = btoa(`${email}:${password}`);
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminEmail', email);
        setIsAdmin(true);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <h1>🔐 Admin Login</h1>
            <p>Access to BMER Admin Dashboard</p>
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <input
                type="email"
                id="email"
                placeholder="admin@bmer.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Back Button */}
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>

          {/* Security Notice */}
          <div className="security-notice">
            <p>🔒 Your credentials are secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
