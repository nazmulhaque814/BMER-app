import React, { useState } from 'react';
import '../styles/VoiceManagement.css';
import { downloadVoice, downloadBatch } from '../utils/storage';

const VoiceManagement = ({ voices, emotions }) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const emotionVoices = selectedEmotion
    ? voices.filter(v => v.emotion === selectedEmotion)
    : [];

  const handleDownloadVoice = async (voiceId) => {
    setDownloading(true);
    try {
      await downloadVoice(voiceId);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleBatchDownload = async () => {
    if (!selectedEmotion) return;
    setDownloading(true);
    try {
      await downloadBatch(selectedEmotion);
    } catch (err) {
      console.error('Batch download failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="voice-management">
      <h2>🗂️ Voice Management</h2>

      {/* Emotion Selection */}
      <div className="emotion-selector">
        <h3>Select Emotion:</h3>
        <div className="emotion-buttons">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              className={`emotion-btn ${selectedEmotion === emotion ? 'active' : ''}`}
              onClick={() => setSelectedEmotion(emotion)}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      {/* Voices List */}
      {selectedEmotion && (
        <div className="voices-section">
          <div className="section-header">
            <h3>{selectedEmotion.toUpperCase()} Voices ({emotionVoices.length})</h3>
            <button
              className="btn btn-batch-download"
              onClick={handleBatchDownload}
              disabled={downloading || emotionVoices.length === 0}
            >
              📥 Download All as ZIP
            </button>
          </div>

          {emotionVoices.length > 0 ? (
            <div className="voices-list">
              {emotionVoices.map((voice) => (
                <div key={voice.voice_id} className="voice-item">
                  <div className="voice-info">
                    <p><strong>ID:</strong> {voice.voice_id}</p>
                    <p><strong>Duration:</strong> {voice.duration}s</p>
                    <p><strong>Date:</strong> {new Date(voice.timestamp).toLocaleDateString()}</p>
                    {voice.age && <p><strong>Age:</strong> {voice.age}</p>}
                    {voice.district && <p><strong>District:</strong> {voice.district}</p>}
                  </div>
                  <button
                    className="btn btn-download"
                    onClick={() => handleDownloadVoice(voice.voice_id)}
                    disabled={downloading}
                  >
                    📥 Download
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-voices">No voices found for this emotion.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceManagement;
