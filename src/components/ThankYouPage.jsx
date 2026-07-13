import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ThankYouPage.css';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleNewSubmission = () => {
    navigate('/');
  };

  return (
    <div className="thank-you-page">
      <div className="container">
        <div className="thank-you-card">
          {/* Heart Animation */}
          <div className="heart-animation">❤️</div>

          {/* Message */}
          <h1>Thank You! 🎉</h1>
          <p className="main-message">
            Your voice has been successfully submitted!
          </p>

          {/* Details */}
          <div className="details">
            <p>✓ Your voice has been encrypted and securely stored</p>
            <p>✓ It will help advance Bangla emotion recognition research</p>
            <p>✓ Your contribution makes a difference!</p>
          </div>

          {/* Impact Message */}
          <div className="impact">
            <h3>Why Your Voice Matters</h3>
            <p>
              Every voice submission helps create better AI systems for Bangla speakers.
              Your data contributes to research that makes technology more inclusive and 
              representative of diverse languages and cultures.
            </p>
          </div>

          {/* Share Section */}
          <div className="share-section">
            <h3>Share with Friends</h3>
            <p>Know someone else who'd like to contribute?</p>
            <button className="btn btn-share" onClick={() => {
              const text = 'Help advance Bangla NLP research! Contribute your voice: ' + window.location.origin;
              if (navigator.share) {
                navigator.share({ title: 'BMER', text: text });
              } else {
                alert(text);
              }
            }}>
              📤 Share This App
            </button>
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button
              className="btn btn-primary"
              onClick={handleNewSubmission}
            >
              Contribute Another Voice 🎤
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = '/'}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
