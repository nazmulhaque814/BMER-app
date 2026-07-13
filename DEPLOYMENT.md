# BMER App - Deployment Instructions

## 📦 Prerequisites

- Node.js 14+
- Firebase account
- GitHub account (for CI/CD)
- Heroku/Cloud Run account (optional)

## 🚀 Step-by-Step Deployment

### 1. Firebase Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init

# Select: Firestore, Storage, Hosting
# Configure public directory: build
```

### 2. Update Firebase Config

```bash
# Edit .firebaserc
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 3. Deploy Frontend

```bash
# Build React app
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### 4. Deploy Backend

**Option A: Heroku**
```bash
npm install -g heroku
heroku login
heroku create bmer-app-backend
git push heroku main
```

**Option B: Google Cloud Run**
```bash
gcloud run deploy bmer-app-backend \
  --source . \
  --platform managed \
  --region us-central1
```

**Option C: DigitalOcean App Platform**
- Push to GitHub
- Connect to DigitalOcean
- Deploy from GitHub

### 5. Setup Environment Variables

Create `.env` in backend:
```
REACT_APP_FIREBASE_API_KEY=xxx
REACT_APP_FIREBASE_PROJECT_ID=xxx
ADMIN_EMAIL=admin@bmer.com
ADMIN_PASSWORD=strong_password
NODE_ENV=production
```

### 6. Security Rules

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage
```

## 🔄 CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: 'your-project-id'
```

## ✅ Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Firebase connection works
- [ ] Admin login works
- [ ] Voice recording works
- [ ] Upload successful
- [ ] PWA installable
- [ ] Offline mode works
- [ ] Security rules active
- [ ] Monitoring enabled

## 🔒 Production Security

1. Use strong admin password
2. Enable 2FA on Firebase
3. Restrict admin IP (optional)
4. Enable Cloud Audit Logs
5. Setup monitoring alerts
6. Regular security audits
7. Backup data weekly

## 📊 Monitoring

```bash
# View Firebase logs
firebase functions:log

# Monitor backend
heroku logs --tail
# or
gcloud logging read
```

## 🚨 Troubleshooting

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Firebase auth issues
```bash
firebase logout
firebase login
firebase deploy
```

### Backend not connecting
- Check environment variables
- Verify Firebase credentials
- Check CORS settings
- Review server logs

## 📞 Support

For deployment issues, check:
- Firebase documentation
- Backend logs
- Browser console
- Network tab

---

**Deployment completed! 🎉**
