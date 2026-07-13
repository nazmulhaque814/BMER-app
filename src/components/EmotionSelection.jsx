import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EmotionSelection.css';

const EmotionSelection = ({ setEmotion }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const emotions = [
    { id: 'happy', label: 'Happy', emoji: '😊', color: '#fbbf24' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: '#3b82f6' },
    { id: 'angry', label: 'Angry', emoji: '😠', color: '#ef4444' },
    { id: 'neutral', label: 'Neutral', emoji: '😐', color: '#6b7280' },
    { id: 'fear', label: 'Fear', emoji: '😨', color: '#a855f7' },
    { id: 'surprise', label: 'Surprise', emoji: '😮', color: '#ec4899' },
    { id: 'contempt', label: 'Contempt', emoji: '😒', color: '#8b5cf6' },
    { id: 'confusion', label: 'Confusion', emoji: '😕', color: '#06b6d4' },
    { id: 'confidence', label: 'Confidence', emoji: '😎', color: '#10b981' },
    { id: 'excitement', label: 'Excitement', emoji: '🤩', color: '#f97316' },
    { id: 'disgust', label: 'Disgust', emoji: '🤢', color: '#14b8a6' }
  ];

  const handleSelect = (emotion) => {
    setSelected(emotion.id);
    setEmotion(emotion.id);
  };

  const handleContinue = () => {
    if (selected) {
      localStorage.setItem('selectedEmotion', selected);
      navigate('/record');
    }
  };

  return (
    <div className="emotion-selection">
      <div className="container">
        <div className="emotion-header">
          <h1>😊 Select an Emotion</h1>
          <p>Choose the emotion you want to express</p>
        </div>

        {/* Emotion Grid */}
        <div className="emotion-grid">
          {emotions.map((emotion) => (
            <div
              key={emotion.id}
              className={`emotion-card ${selected === emotion.id ? 'selected' : ''}`}
              onClick={() => handleSelect(emotion)}
              style={{
                borderColor: selected === emotion.id ? emotion.color : 'transparent',
                backgroundColor: selected === emotion.id ? `${emotion.color}15` : 'white'
              }}
            >
              <div className="emotion-emoji" style={{ fontSize: '48px' }}>
                {emotion.emoji}
              </div>
              <div className="emotion-label">{emotion.label}</div>
              {selected === emotion.id && (
                <div className="selected-indicator">✓</div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Emotion Display */}
        {selected && (
          <div className="selected-emotion">
            <p>You selected: <strong>{emotions.find(e => e.id === selected)?.label}</strong></p>
          </div>
        )}

        {/* Buttons */}
        <div className="buttons">
          <button
            className="btn btn-primary"
            onClick={handleContinue}
            disabled={!selected}
          >
            Continue to Recording ➜
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionSelection;
