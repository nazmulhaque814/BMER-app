import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

// Generate encryption key
export const generateEncryptionKey = () => {
  return nacl.randomBytes(32);
};

// Encrypt audio data
export const encryptAudio = (audioData, encryptionKey) => {
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
  const encrypted = nacl.secretbox(audioData, nonce, encryptionKey);
  
  // Combine nonce + encrypted data
  const combined = new Uint8Array(nonce.length + encrypted.length);
  combined.set(nonce);
  combined.set(encrypted, nonce.length);
  
  return combined;
};

// Decrypt audio data
export const decryptAudio = (encryptedData, encryptionKey) => {
  const nonce = encryptedData.slice(0, nacl.secretbox.nonceLength);
  const encrypted = encryptedData.slice(nacl.secretbox.nonceLength);
  
  try {
    const decrypted = nacl.secretbox.open(encrypted, nonce, encryptionKey);
    if (!decrypted) {
      throw new Error('Decryption failed');
    }
    return decrypted;
  } catch (err) {
    console.error('Decryption error:', err);
    throw err;
  }
};

// Key management
export const saveEncryptionKey = (key, keyId) => {
  const keyStr = util.encodeBase64(key);
  localStorage.setItem(`encKey_${keyId}`, keyStr);
};

export const getEncryptionKey = (keyId) => {
  const keyStr = localStorage.getItem(`encKey_${keyId}`);
  if (!keyStr) return null;
  return util.decodeBase64(keyStr);
};
