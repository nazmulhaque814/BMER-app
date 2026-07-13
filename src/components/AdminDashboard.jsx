import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import VoiceManagement from './VoiceManagement';
import { getVoiceStats, getAllVoices } from '../utils/storage';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [voices, setVoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchFilters, setSearchFilters] = useState({});

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const statsData = await getVoiceStats();
      setStats(statsData);
      const voicesData = await getAllVoices();
      setVoices(voicesData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/');
  };

  const emotions = ['happy', 'sad', 'angry', 'neutral', 'fear', 'surprise', 'contempt', 'confusion', 'confidence', 'excitement', 'disgust'];

  if (loading) {
    return <div className="loading">Loading Dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>🔐 BMER Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'management' ? 'active' : ''}`}
            onClick={() => setActiveTab('management')}
          >
            🗂️ Voice Management
          </button>
          <button
            className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            🔍 Search & Filter
          </button>
        </nav>
        <button className="btn btn-logout" onClick={handleLogout}>
          Logout 🚪
        </button>
      </div>

      <div className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Admin: {localStorage.getItem('adminEmail')}</p>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            {/* Stats Overview */}
            <div className="stats-overview">
              <div className="stat-card total">
                <div className="stat-value">{Object.values(stats).reduce((a, b) => a + (b || 0), 0)}</div>
                <div className="stat-label">Total Voices</div>
              </div>
            </div>

            {/* Emotions Stats Grid */}
            <div className="emotions-grid">
              {emotions.map((emotion) => (
                <div key={emotion} className="emotion-stat-card">
                  <div className="emotion-name">{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</div>
                  <div className="emotion-count">{stats[emotion] || 0}</div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${((stats[emotion] || 0) / Math.max(...Object.values(stats), 1)) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voice Management Tab */}
        {activeTab === 'management' && (
          <VoiceManagement voices={voices} emotions={emotions} />
        )}

        {/* Search & Filter Tab */}
        {activeTab === 'search' && (
          <div className="search-content">
            <h2>🔍 Search & Filter Voices</h2>
            <p>Search functionality coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
