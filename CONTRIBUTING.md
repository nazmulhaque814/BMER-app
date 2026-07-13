# Bangla Multimodal Emotion Recognition - Voice Data Collection App

🎤 **BMER** is a secure, privacy-first web application for collecting Bangla voice data to train emotion recognition AI models. The app combines speech and text analysis with transformer-based deep learning.

## ✨ Key Features

### 👥 User Side
- 🎤 One-click voice recording
- 😊 11 emotion categories
- 📋 GDPR-compliant consent
- 📱 Mobile-friendly PWA
- 🔒 End-to-end encryption
- 📡 Offline support

### 🔐 Admin Side
- 📊 Real-time statistics
- 🔎 Advanced search & filter
- 📥 Batch download
- 🎯 Emotion-organized storage
- 🛡️ Admin-only access

## 🚀 Quick Start

```bash
# Clone & setup
git clone https://github.com/nazmulhaque814/BMER-app.git
cd BMER-app
npm install

# Configure Firebase
cp .env.example .env
# Edit .env with your credentials

# Run
npm run dev
```

## 📁 Tech Stack

- **Frontend**: React 18, PWA, Web Audio API
- **Backend**: Node.js + Express
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Encryption**: TweetNaCl.js (AES)
- **Deployment**: Firebase Hosting + Cloud Run

## 🔒 Security

- ✅ End-to-end encryption
- ✅ Firebase security rules
- ✅ No public file URLs
- ✅ Random file naming (UUID)
- ✅ Admin authentication
- ✅ HTTPS only

## 📊 Emotions Supported

😊 Happy | 😢 Sad | 😠 Angry | 😐 Neutral | 😨 Fear | 😮 Surprise | 😒 Contempt | 😕 Confusion | 😎 Confidence | 🤩 Excitement | 🤮 Disgust

## 📖 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Complete installation
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to production
- [README.md](./README.md) - Project overview

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - See [LICENSE](./LICENSE) file

## 👨‍🔬 Research

Part of **EII (Electronics and Information Institute)** research on Bangla emotion recognition using multimodal approaches.

## 📞 Contact

- GitHub: [@nazmulhaque814](https://github.com/nazmulhaque814)
- Email: nazmulhaquesagor814@gmail.com

---

**Made with ❤️ for Bangla NLP Research**
