import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/consent');
  };

  const handleAdmin = () => {
    navigate('/admin/login');
  };

  return (
    <div className="home-page">
      <div className="container">
        {/* Logo and Header */}
        <div className="header">
          <div className="logo">🎤</div>
          <h1>BMER</h1>
          <p className="subtitle">Bangla Multimodal Emotion Recognition</p>
        </div>

        {/* Welcome Message */}
        <div className="welcome-section">
          <h2>Contribute Your Voice for Research</h2>
          <p>
            Help us build a better Bangla emotion recognition system by contributing your voice.
            Your data will help advance NLP research and make AI more inclusive for Bangla speakers.
          </p>
        </div>

        {/* Features */}
        <div className="features">
          <div className="feature-item">
            <span className="feature-icon">🔐</span>
            <h3>Secure & Private</h3>
            <p>Your data is encrypted end-to-end</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <h3>Quick Process</h3>
            <p>Takes only 2-3 minutes</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <h3>Easy Recording</h3>
            <p>Simple one-click recording</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="buttons">
          <button className="btn btn-primary" onClick={handleStart}>
            Start Contributing 🚀
          </button>
          <button className="btn btn-secondary" onClick={handleAdmin}>
            Admin Login 👨‍💼
          </button>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>📊 Part of EII Research Initiative</p>
          <p className="small">Your contribution matters for Bangla NLP research</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
