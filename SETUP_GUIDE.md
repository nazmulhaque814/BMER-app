# 📖 BMER App - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- npm or yarn
- Firebase account
- Git

### Installation

```bash
# 1. Clone repository
git clone https://github.com/nazmulhaque814/BMER-app.git
cd BMER-app

# 2. Install dependencies
npm install

# 3. Setup Firebase
# - Go to https://console.firebase.google.com
# - Create new project
# - Enable: Authentication, Firestore, Storage
# - Copy your config

# 4. Create .env file
cp .env.example .env
# Edit .env with your Firebase credentials

# 5. Setup Backend
cd backend
# Download Firebase Admin JSON from Firebase Console
# Place it in backend/config/firebase-admin.json

# 6. Run application
npm run dev
```

## 📁 Project Structure

```
BMER-app/
├── public/                    # Static files & PWA
│   ├── index.html            # Main HTML
│   ├── manifest.json         # PWA manifest
│   ├── service-worker.js     # Offline support
│   └── offline.html          # Offline page
├── src/
│   ├── components/           # React components
│   │   ├── HomePage.jsx
│   │   ├── ConsentPage.jsx
│   │   ├── BasicInfoPage.jsx
│   │   ├── EmotionSelection.jsx
│   │   ├── RecordingPage.jsx
│   │   ├── ThankYouPage.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── VoiceManagement.jsx
│   ├── utils/                # Helper functions
│   │   ├── firebase.js       # Firebase config
│   │   ├── encryption.js     # AES encryption
│   │   ├── audioRecorder.js  # Audio recording
│   │   ├── storage.js        # Firebase operations
│   │   └── auth.js           # Authentication
│   ├── styles/               # CSS files
│   ├── App.jsx               # Main app
│   └── index.jsx             # Entry point
├── backend/
│   ├── server.js             # Express server
│   ├── routes/               # API routes
│   │   ├── auth.js           # Authentication
│   │   ├── voices.js         # Voice operations
│   │   └── admin.js          # Admin operations
│   ├── middleware/           # Middleware
│   │   └── auth.js           # Auth middleware
│   └── config/               # Configuration
│       └── .gitkeep
├── firestore.rules           # Firestore security rules
├── storage.rules             # Storage security rules
├── firebase.json             # Firebase config
├── .firebaserc               # Firebase project
└── package.json              # Dependencies
```

## 🔐 Security Implementation

### Firebase Storage Rules
- ✅ Only admins can read files
- ✅ Anyone can upload
- ✅ No public URLs
- ✅ Random file naming (UUID)

### Firestore Rules
- ✅ Users can only create documents
- ✅ Admins have full access
- ✅ No direct data exposure

### Encryption
- ✅ End-to-end AES encryption (TweetNaCl.js)
- ✅ Client-side encryption before upload
- ✅ Server-side decryption for admins
- ✅ Secure key management

## 🎯 User Flow

1. **Home** → View app info and start
2. **Consent** → GDPR-compliant consent form
3. **Basic Info** → Optional age & district
4. **Emotion Selection** → Choose 11 emotions
5. **Recording** → Record voice (Web Audio API)
6. **Upload** → Encrypted upload to Firebase
7. **Thank You** → Success page with sharing

## 👨‍💼 Admin Flow

1. **Admin Login** → Secure authentication
2. **Dashboard** → Real-time statistics
3. **Voice Management** → Browse by emotion
4. **Search & Filter** → Advanced filtering
5. **Download** → Individual or batch download

## 📊 Firebase Structure

### Firestore Collections
```
voices/ {
  voice_id: UUID
  emotion: string (11 options)
  storage_url: string
  key_id: UUID (for decryption)
  age: number (optional)
  district: string (optional)
  device: string
  duration: number
  sample_rate: 16000
  timestamp: date
  consent_version: string
}
```

### Storage Folders
```
voices/
├── happy/
├── sad/
├── angry/
├── neutral/
├── fear/
├── surprise/
├── contempt/
├── confusion/
├── confidence/
├── excitement/
└── disgust/
```

## 🔧 Configuration

### Environment Variables (.env)
```
REACT_APP_FIREBASE_API_KEY=xxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxx
REACT_APP_FIREBASE_PROJECT_ID=xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxx
REACT_APP_FIREBASE_APP_ID=xxx

ADMIN_EMAIL=admin@bmer.com
ADMIN_PASSWORD=strong_password
NODE_ENV=production
```

## 🚀 Deployment

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init

# Deploy
npm run build
firebase deploy
```

### Backend (Node.js)
Deploy `backend/server.js` to:
- Heroku
- Cloud Run
- AWS Lambda
- DigitalOcean
- etc.

## 📱 PWA Features

- ✅ Install on Android/iOS
- ✅ Offline support with Service Worker
- ✅ Background sync
- ✅ App icons and manifest
- ✅ Responsive design

## 🛠️ Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Deploy
npm run deploy
```

## 📝 Emotions Supported

1. 😊 Happy
2. 😢 Sad
3. 😠 Angry
4. 😐 Neutral
5. 😨 Fear
6. 😮 Surprise
7. 😒 Contempt
8. 😕 Confusion
9. 😎 Confidence
10. 🤩 Excitement
11. 🤮 Disgust

## 🔒 Security Best Practices

1. **Never commit secrets**: Use `.env` files
2. **Validate all inputs**: Both client & server
3. **Use HTTPS only**: In production
4. **Enable Firebase rules**: Restrict access
5. **Regular backups**: Export data periodically
6. **Audit logs**: Monitor admin access
7. **Data retention**: Delete old data
8. **SSL certificates**: HTTPS everywhere

## 🐛 Troubleshooting

### Microphone not working?
- Check browser permissions
- Use HTTPS (required for getUserMedia)
- Try different browser

### Firebase connection issues?
- Verify credentials in `.env`
- Check firewall/network
- Enable Firebase services

### Upload fails?
- Check storage quota
- Verify Firebase rules
- Check network connection

## 📞 Support

For issues or questions:
- Create GitHub issue
- Check documentation
- Email: admin@bmer.com

## 📄 License

MIT License - See LICENSE file

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 👨‍🔬 Research

Part of EII (Electronics and Information Institute) research on Bangla emotion recognition.

---

**Made with ❤️ for Bangla NLP Research**
