const express = require('express');
const router = express.Router();

// Verify admin token
router.post('/verify', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email, password] = decoded.split(':');

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      res.json({ success: true, message: 'Token valid' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token verification failed' });
  }
});

module.exports = router;
