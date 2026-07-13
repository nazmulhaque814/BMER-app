const express = require('express');
const router = express.Router();
const { verifyAdminToken } = require('../middleware/auth');

// Admin login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@bmer.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

  if (email === adminEmail && password === adminPassword) {
    const token = Buffer.from(`${email}:${password}`).toString('base64');
    res.json({
      success: true,
      token: token,
      message: 'Login successful'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Get statistics
router.get('/stats', verifyAdminToken, async (req, res) => {
  try {
    const { db } = require('../server');
    const emotions = ['happy', 'sad', 'angry', 'neutral', 'fear', 'surprise', 'contempt', 'confusion', 'confidence', 'excitement', 'disgust'];
    const stats = {};

    for (const emotion of emotions) {
      const snapshot = await db.collection('voices')
        .where('emotion', '==', emotion)
        .get();
      stats[emotion] = snapshot.size;
    }

    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
