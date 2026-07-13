import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ConsentPage from './components/ConsentPage';
import BasicInfoPage from './components/BasicInfoPage';
import EmotionSelection from './components/EmotionSelection';
import RecordingPage from './components/RecordingPage';
import ThankYouPage from './components/ThankYouPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './styles/App.css';

const App = () => {
  const [userConsent, setUserConsent] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/consent" element={<ConsentPage setConsent={setUserConsent} />} />
        <Route path="/info" element={<BasicInfoPage setUserInfo={setUserInfo} />} />
        <Route path="/emotions" element={<EmotionSelection setEmotion={setSelectedEmotion} />} />
        <Route path="/record" element={<RecordingPage emotion={selectedEmotion} userInfo={userInfo} />} />
        <Route path="/thank-you" element={<ThankYouPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
        <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <AdminLogin setIsAdmin={setIsAdmin} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
