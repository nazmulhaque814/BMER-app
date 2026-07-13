import { db, storage } from './firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getBytes, listAll } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { encryptAudio, generateEncryptionKey, saveEncryptionKey } from './encryption';
import { getAudioDuration } from './audioRecorder';

// Upload encrypted voice
export const uploadEncryptedVoice = async ({
  file,
  emotion,
  userInfo,
  duration
}) => {
  try {
    // Generate unique IDs
    const voiceId = uuidv4();
    const keyId = uuidv4();

    // Read audio file as ArrayBuffer
    const audioBuffer = await file.arrayBuffer();
    const audioData = new Uint8Array(audioBuffer);

    // Generate and save encryption key
    const encryptionKey = generateEncryptionKey();
    saveEncryptionKey(encryptionKey, keyId);

    // Encrypt audio
    const encryptedData = encryptAudio(audioData, encryptionKey);
    const encryptedBlob = new Blob([encryptedData], { type: 'application/octet-stream' });

    // Upload to Firebase Storage
    const storageRef = ref(storage, `voices/${emotion}/${voiceId}.wav`);
    await uploadBytes(storageRef, encryptedBlob);

    // Save metadata to Firestore
    const voiceMetadata = {
      voice_id: voiceId,
      emotion: emotion,
      storage_url: `voices/${emotion}/${voiceId}.wav`,
      key_id: keyId,
      age: userInfo?.age || null,
      gender: userInfo?.gender || null,
      district: userInfo?.district || null,
      device: userInfo?.device || navigator.userAgent,
      duration: duration,
      sample_rate: 16000,
      timestamp: Timestamp.now(),
      consent_version: '1.0'
    };

    const docRef = await addDoc(collection(db, 'voices'), voiceMetadata);
    console.log('Voice uploaded successfully:', docRef.id);

    return {
      success: true,
      voiceId: voiceId,
      docId: docRef.id
    };
  } catch (err) {
    console.error('Upload failed:', err);
    throw err;
  }
};

// Get voice statistics
export const getVoiceStats = async () => {
  try {
    const emotions = ['happy', 'sad', 'angry', 'neutral', 'fear', 'surprise', 'contempt', 'confusion', 'confidence', 'excitement', 'disgust'];
    const stats = {};

    for (const emotion of emotions) {
      const q = query(collection(db, 'voices'), where('emotion', '==', emotion));
      const snapshot = await getDocs(q);
      stats[emotion] = snapshot.size;
    }

    return stats;
  } catch (err) {
    console.error('Failed to get stats:', err);
    return {};
  }
};

// Get all voices
export const getAllVoices = async () => {
  try {
    const q = query(collection(db, 'voices'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
  } catch (err) {
    console.error('Failed to get voices:', err);
    return [];
  }
};

// Download voice
export const downloadVoice = async (voiceId) => {
  try {
    const q = query(collection(db, 'voices'), where('voice_id', '==', voiceId));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      throw new Error('Voice not found');
    }

    const voiceDoc = snapshot.docs[0].data();
    const storageRef = ref(storage, voiceDoc.storage_url);
    const data = await getBytes(storageRef);

    // Create download link
    const url = URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${voiceId}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download failed:', err);
    throw err;
  }
};

// Batch download
export const downloadBatch = async (emotion) => {
  try {
    const q = query(collection(db, 'voices'), where('emotion', '==', emotion));
    const snapshot = await getDocs(q);

    // Note: This is a placeholder for batch download functionality
    // In production, you'd typically use a backend service to generate ZIP files
    console.log(`Batch download initiated for ${emotion} with ${snapshot.size} files`);
    alert(`Downloading ${snapshot.size} voices for ${emotion}...`);
  } catch (err) {
    console.error('Batch download failed:', err);
    throw err;
  }
};
