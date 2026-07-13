import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecordingPage.css';
import { recordAudio, stopRecording } from '../utils/audioRecorder';
import { uploadEncryptedVoice } from '../utils/storage';

const RecordingPage = ({ emotion, userInfo }) => {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [duration, setDuration] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks = [];
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      });

      mediaRecorder.start();
      setRecording(true);
      setDuration(0);

      // Timer
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } catch (err) {
      setError('Microphone access denied. Please allow microphone access.');
    }
  };

  const stopRecordingHandler = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const playRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      audioRef.current.src = url;
      audioRef.current.play();
    }
  };

  const recordAgain = () => {
    setAudioBlob(null);
    setDuration(0);
    setError('');
  };

  const handleSubmit = async () => {
    if (!audioBlob || !emotion) {
      setError('Please record your voice first');
      return;
    }

    setUploading(true);
    try {
      await uploadEncryptedVoice({
        file: audioBlob,
        emotion: emotion,
        userInfo: userInfo,
        duration: duration
      });
      navigate('/thank-you');
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="recording-page">
      <div className="container">
        <div className="recording-card">
          {/* Header */}
          <div className="recording-header">
            <h1>🎤 Record Your Voice</h1>
            <p>Express the emotion: <strong>{emotion}</strong></p>
          </div>

          {/* Recording Display */}
          <div className="recording-display">
            <div className="timer">{formatTime(duration)}</div>
            {recording && <div className="recording-indicator">● Recording...</div>}
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Controls */}
          <div className="recording-controls">
            {!audioBlob ? (
              <>
                {!recording ? (
                  <button
                    className="btn btn-record"
                    onClick={startRecording}
                  >
                    🎤 Start Recording
                  </button>
                ) : (
                  <button
                    className="btn btn-stop"
                    onClick={stopRecordingHandler}
                  >
                    ■ Stop
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  className="btn btn-play"
                  onClick={playRecording}
                >
                  ▶ Play
                </button>
                <button
                  className="btn btn-retry"
                  onClick={recordAgain}
                >
                  🔄 Record Again
                </button>
                <audio ref={audioRef} />
              </>
            )}
          </div>

          {/* Tips */}
          <div className="tips">
            <p>💡 <strong>Tips:</strong></p>
            <ul>
              <li>Speak naturally and clearly</li>
              <li>Record for 3-10 seconds</li>
              <li>Minimize background noise</li>
              <li>Express the emotion genuinely</li>
            </ul>
          </div>

          {/* Submit Button */}
          {audioBlob && (
            <div className="submit-section">
              <button
                className="btn btn-submit"
                onClick={handleSubmit}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : '✓ Submit'}
              </button>
            </div>
          )}

          {/* Back Button */}
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordingPage;
