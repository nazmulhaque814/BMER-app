// Audio Recorder Utility
export const recordAudio = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 16000 // Optimal for speech recognition
      }
    });
    return stream;
  } catch (err) {
    throw new Error('Microphone access denied: ' + err.message);
  }
};

export const stopRecording = (mediaRecorder) => {
  return new Promise((resolve) => {
    const audioChunks = [];

    mediaRecorder.addEventListener('dataavailable', (event) => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      resolve(audioBlob);
    });

    mediaRecorder.stop();
  });
};

export const getAudioDuration = (audioBlob) => {
  return new Promise((resolve) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const reader = new FileReader();

    reader.onload = (e) => {
      audioContext.decodeAudioData(
        e.target.result,
        (audioBuffer) => {
          resolve(audioBuffer.duration);
        },
        () => resolve(0)
      );
    };

    reader.readAsArrayBuffer(audioBlob);
  });
};
