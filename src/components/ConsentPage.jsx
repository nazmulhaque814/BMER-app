import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ConsentPage.css';

const ConsentPage = ({ setConsent }) => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const handleContinue = () => {
    if (agreed) {
      setConsent(true);
      localStorage.setItem('userConsent', JSON.stringify({
        agreed: true,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }));
      navigate('/info');
    }
  };

  return (
    <div className="consent-page">
      <div className="container">
        <div className="consent-card">
          {/* Header */}
          <div className="consent-header">
            <h1>📋 Research Consent</h1>
            <p>Please read and accept the following terms</p>
          </div>

          {/* Consent Text */}
          <div className="consent-text">
            <h2>Voice Data Contribution Agreement</h2>
            
            <section>
              <h3>Purpose</h3>
              <p>
                This research aims to develop Bangla emotion recognition systems using speech and text analysis 
                with transformer-based deep learning models. Your voice contributions will help improve AI systems 
                for Bangla speakers.
              </p>
            </section>

            <section>
              <h3>What We Collect</h3>
              <ul>
                <li>✓ Your voice recordings (WAV format)</li>
                <li>✓ Optional: Age and District information</li>
                <li>✓ Device information (for research purposes)</li>
                <li>✓ Recording metadata (duration, quality)</li>
              </ul>
            </section>

            <section>
              <h3>Data Security</h3>
              <ul>
                <li>✓ End-to-end encryption (AES-256)</li>
                <li>✓ Secure Firebase backend</li>
                <li>✓ Admin-only access</li>
                <li>✓ No public file URLs</li>
                <li>✓ Random file naming</li>
              </ul>
            </section>

            <section>
              <h3>Your Rights</h3>
              <ul>
                <li>✓ Completely voluntary participation</li>
                <li>✓ No personal data required</li>
                <li>✓ Research purposes only</li>
                <li>✓ Data retention: 2 years from collection</li>
              </ul>
            </section>

            {readMore && (
              <section>
                <h3>Terms & Conditions</h3>
                <p>
                  By submitting your voice, you agree that:
                </p>
                <ul>
                  <li>• Your voice data will be used only for Bangla emotion recognition research</li>
                  <li>• Your data will not be used for commercial purposes</li>
                  <li>• We will not share your data with third parties without consent</li>
                  <li>• Your data will be securely stored and protected</li>
                  <li>• You have the right to request data deletion</li>
                </ul>
              </section>
            )}
          </div>

          {/* Read More Toggle */}
          <button className="read-more-btn" onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Show Less ▲' : 'Read Full Terms ▼'}
          </button>

          {/* Checkbox */}
          <div className="consent-checkbox">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agree">
              I agree to donate my voice for research purposes and understand my rights
            </label>
          </div>

          {/* Buttons */}
          <div className="consent-buttons">
            <button
              className="btn btn-primary"
              onClick={handleContinue}
              disabled={!agreed}
            >
              Continue ✓
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentPage;
