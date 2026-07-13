# 🎤 BMER - Bangla Multimodal Emotion Recognition

A secure, privacy-first voice data collection application for Bangla emotion recognition research using speech and text with transformer-based deep learning.

## ✨ Features

### User Side (Data Collection)
- ✅ **11 Emotion Categories**: Contempt, Happy, Sad, Angry, Neutral, Fear, Surprise, Confusion, Confidence, Excitement, Disgust
- ✅ **Easy Recording**: One-click recording interface
- ✅ **Consent Management**: GDPR-compliant consent collection
- ✅ **Optional Demographics**: Age and District information
- ✅ **PWA Support**: Install as mobile app
- ✅ **Offline Support**: Record offline, sync when online
- ✅ **Responsive Design**: Works on all devices

### Admin Side (Dashboard)
- 🔐 **Admin Login**: Secure authentication
- 📊 **Dashboard**: Real-time statistics by emotion
- 🗂️ **Organized Storage**: Emotions in separate folders
- 🔍 **Advanced Search**: Filter by age, gender, district, emotion, date
- ⬇️ **Batch Download**: Download as ZIP files
- 📈 **Data Analytics**: Insights and reports

### Security Features
- 🔐 **End-to-End Encryption**: TweetNaCl.js
- 🔒 **Firebase Security Rules**: Strict access control
- 🎲 **Random File Names**: UUID-based storage
- 🛡️ **Admin-Only Access**: No public URLs
- 🔑 **Encryption Keys**: Securely managed

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- npm or yarn
- Firebase account
- Git

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
   - Create a Firebase project at https://console.firebase.google.com
   - Enable: Authentication, Firestore, Storage
   - Copy Firebase config

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase credentials
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
BMER-app/
├── public/              # Static files & PWA assets
├── src/
│   ├── components/      # React components
│   ├── utils/           # Helper functions
│   ├── hooks/           # Custom hooks
│   ├── styles/          # CSS files
│   ├── App.jsx          # Main app
│   └── index.jsx        # Entry point
├── backend/             # Node.js backend
├── package.json
└── .env.example
```

## 🔐 Security Implementation

### Firebase Storage Rules
```
- Only admins can read files
- Anyone can upload
- No one can list or delete
```

### Firestore Rules
```
- Users can only create documents
- Admins have full access
```

## 💾 Firebase Structure

### Storage
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

### Firestore
```
voices/ collection
  ├── voice_id (string)
  ├── emotion (string)
  ├── storage_url (string)
  ├── age (number, optional)
  ├── gender (string, optional)
  ├── district (string, optional)
  ├── device (string)
  ├── duration (number)
  ├── sample_rate (number)
  ├── timestamp (date)
  └── consent_version (string)
```

## 📖 Usage

### For Users
1. Visit the app URL
2. Review and accept consent
3. Enter optional demographic info
4. Select an emotion
5. Record your voice
6. Submit

### For Admins
1. Login with admin credentials
2. View dashboard statistics
3. Browse organized voice files
4. Search and filter data
5. Download as needed

## 📱 PWA Installation

- **Android**: Click install button in Chrome
- **iOS**: Use Share → Add to Home Screen
- **Desktop**: Click install in the address bar

## 🛠️ Development

```bash
# Start development server
npm start

# Start backend server
npm run server

# Run both
npm run dev

# Build for production
npm run build
```

## 📝 License

MIT License - See LICENSE file for details

## 👨‍🔬 Research

This project is part of EII (Electronics and Information Institute) research on Bangla emotion recognition using multimodal approaches.

## ⚠️ Important Notes

1. **Data Privacy**: All voice data is encrypted end-to-end
2. **Consent**: Explicit consent required from all contributors
3. **Research Only**: Data will be used only for research purposes
4. **No Commercial Use**: Voices cannot be used commercially
5. **Data Retention**: Specify retention period in your terms

---

**Made with ❤️ for Bangla NLP Research**
