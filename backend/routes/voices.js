const express = require('express');
const router = express.Router();
const { db, bucket } = require('../server');
const { v4: uuidv4 } = require('uuid');

// Get all voices
router.get('/', async (req, res) => {
  try {
    const emotion = req.query.emotion;
    let query = db.collection('voices');

    if (emotion) {
      query = query.where('emotion', '==', emotion);
    }

    const snapshot = await query.get();
    const voices = [];

    snapshot.forEach(doc => {
      voices.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({ success: true, voices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Search voices
router.post('/search', async (req, res) => {
  try {
    const { emotion, age, district, startDate, endDate } = req.body;
    let query = db.collection('voices');

    if (emotion) {
      query = query.where('emotion', '==', emotion);
    }

    if (age) {
      query = query.where('age', '==', age);
    }

    if (district) {
      query = query.where('district', '==', district);
    }

    const snapshot = await query.get();
    let voices = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      const timestamp = data.timestamp?.toDate?.() || new Date(data.timestamp);

      if (startDate && timestamp < new Date(startDate)) return;
      if (endDate && timestamp > new Date(endDate)) return;

      voices.push({
        id: doc.id,
        ...data
      });
    });

    res.json({ success: true, voices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Download voice
router.get('/download/:voiceId', async (req, res) => {
  try {
    const { voiceId } = req.params;
    const snapshot = await db.collection('voices')
      .where('voice_id', '==', voiceId)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'Voice not found' });
    }

    const voiceDoc = snapshot.docs[0].data();
    const file = bucket.file(voiceDoc.storage_url);
    const exists = await file.exists();

    if (!exists[0]) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Disposition', `attachment; filename="${voiceId}.wav"`);

    file.createReadStream()
      .on('error', (err) => {
        res.status(500).json({ error: err.message });
      })
      .pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
