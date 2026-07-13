# Bangla Multimodal Emotion Recognition - BMER App

A secure, privacy-first web application for collecting Bangla voice data to train emotion recognition AI models using speech and text with transformer-based deep learning.

## 🎯 Project Overview

BMER is designed to collect authentic voice samples expressing 11 different emotions in Bangla language. The collected data will be used for:
- Emotion recognition model training
- Bangla NLP research
- Speech processing improvements
- AI inclusivity for Bangla speakers

## 🌟 Highlights

### Security First
- End-to-end AES encryption
- Firebase security rules
- No public URLs
- Admin-only access

### User Friendly
- Simple 5-step process
- Mobile responsive
- Offline capable
- Installable PWA

### Researcher Friendly
- Real-time statistics
- Advanced search/filter
- Batch download
- Organized storage

## 📋 Getting Started

### Prerequisites
```bash
Node.js >= 14
npm >= 6
Firebase account
Git
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nazmulhaque814/BMER-app.git
   cd BMER-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Firebase**
   - Create project at https://console.firebase.google.com
   - Enable: Authentication, Firestore, Storage
   - Copy configuration

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase credentials
   ```

5. **Run application**
   ```bash
   npm run dev
   ```

## 📱 Application Flow

### User Journey
```
Home
  ↓
Consent Form (GDPR)
  ↓
Basic Info (Optional)
  ↓
Select Emotion (11 options)
  ↓
Record Voice
  ↓
Upload (Encrypted)
  ↓
Thank You & Share
```

### Admin Dashboard
```
Login
  ↓
Dashboard (Stats)
  ↓
Voice Management (Browse by Emotion)
  ↓
Search & Filter
  ↓
Download (Individual or Batch)
```

## 🗂️ Project Structure

```
BMER-app/
├── public/                 # Static assets & PWA
├── src/
│   ├── components/        # React components
│   ├── utils/             # Helper functions
│   ├── styles/            # CSS files
│   └── App.jsx            # Main component
├── backend/               # Node.js backend
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth middleware
│   └── config/            # Configuration
├── firebase.rules         # Firestore rules
├── storage.rules          # Storage rules
└── package.json           # Dependencies
```

## 🔐 Security Features

### Encryption
- TweetNaCl.js for AES encryption
- Client-side encryption before upload
- Secure key management
- Server-side decryption for admins

### Firebase Rules
```
✅ Anyone can upload
✅ Only admins can read
✅ No public file URLs
✅ Random file naming (UUID)
✅ No direct access to storage
```

### Data Protection
- End-to-end encryption
- GDPR-compliant consent
- No personal data required
- Optional demographics only
- Secure admin authentication

## 🎤 Emotions Supported

| # | Emotion | Emoji |
|---|---------|-------|
| 1 | Happy | 😊 |
| 2 | Sad | 😢 |
| 3 | Angry | 😠 |
| 4 | Neutral | 😐 |
| 5 | Fear | 😨 |
| 6 | Surprise | 😮 |
| 7 | Contempt | 😒 |
| 8 | Confusion | 😕 |
| 9 | Confidence | 😎 |
| 10 | Excitement | 🤩 |
| 11 | Disgust | 🤮 |

## 📊 Firebase Data Structure

### Firestore Collection: `voices`
```json
{
  "voice_id": "uuid",
  "emotion": "happy",
  "storage_url": "voices/happy/uuid.wav",
  "key_id": "encryption_key_id",
  "age": 25,
  "district": "Dhaka",
  "device": "user_agent",
  "duration": 5.2,
  "sample_rate": 16000,
  "timestamp": "2024-01-15T10:30:00Z",
  "consent_version": "1.0"
}
```

### Storage Structure
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

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

### Backend Deployment
Supports: Heroku, Google Cloud Run, DigitalOcean, AWS Lambda

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🧪 Development

```bash
# Start dev server
npm start

# Start backend
npm run server

# Run both
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🔧 Configuration

### Environment Variables
```bash
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

## 📱 PWA Features

- 📲 Install on Android/iOS
- 🔄 Offline support
- 🚀 Service Worker caching
- 📶 Background sync
- 📱 Responsive design
- 🎨 Custom icons

## 🐛 Troubleshooting

### Microphone not working
- Check browser permissions
- Use HTTPS (required)
- Try different browser
- Check system audio settings

### Firebase connection failed
- Verify `.env` credentials
- Check internet connection
- Enable Firebase services
- Review security rules

### Upload failed
- Check storage quota
- Verify Firebase rules
- Check file size
- Review network logs

## 📖 Documentation

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup instructions
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👨‍🔬 Research Team

Part of **EII (Electronics and Information Institute)** research on Bangla emotion recognition using multimodal approaches.

## 📞 Contact & Support

- **GitHub**: [@nazmulhaque814](https://github.com/nazmulhaque814)
- **Email**: nazmulhaquesagor814@gmail.com
- **Issues**: [GitHub Issues](https://github.com/nazmulhaque814/BMER-app/issues)

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- React community for amazing tools
- All voice contributors
- EII Research Team

## ⚠️ Important Notes

1. **Privacy**: Your voice data is encrypted end-to-end
2. **Consent**: Explicit consent required before submission
3. **Research Only**: Data used only for research purposes
4. **No Commercial Use**: Voices cannot be used commercially
5. **Data Retention**: Specify retention period in your terms

---

**Made with ❤️ for Bangla NLP Research**

*Contribute your voice. Help advance AI for Bangla speakers.* 🎤
