# 🌍 World Time Clock

A beautiful, responsive digital clock that displays the current time across 12 different time zones around the world.

## ✨ Features

- ⏰ Real-time updates every second
- 🌍 12 different time zones
- 🎨 Beautiful gradient background
- 📱 Fully responsive design
- 🏃 Smooth animations
- 🎯 Emoji icons for each location
- ⚡ Fast and lightweight
- 🔤 Monospace font for accuracy

## 🌐 Time Zones Included

1. 🗽 **New York** - America/New_York
2. 🇬🇧 **London** - Europe/London
3. 🏙️ **Dubai** - Asia/Dubai
4. 🇹🇭 **Bangkok** - Asia/Bangkok
5. 🗾 **Tokyo** - Asia/Tokyo
6. 🦘 **Sydney** - Australia/Sydney
7. 🇧🇩 **Dhaka** - Asia/Dhaka
8. 🏝️ **Singapore** - Asia/Singapore
9. 🇭🇰 **Hong Kong** - Asia/Hong_Kong
10. 🌴 **Los Angeles** - America/Los_Angeles
11. 🍁 **Toronto** - America/Toronto
12. 🇧🇷 **São Paulo** - America/Sao_Paulo

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

```bash
# Clone or download the project
cd world-time-clock

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
world-time-clock/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── DigitalClock.jsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── App.css
│   │   └── DigitalClock.css
│   ├── App.jsx
│   └── index.jsx
├── package.json
└── README.md
```

## 🎨 Styling

- **Background**: Purple gradient (from #667eea to #764ba2)
- **Cards**: White with hover animations
- **Time Display**: Large monospace font with glow effect
- **UTC Offset**: Calculated and displayed for each timezone
- **Responsive**: Mobile, tablet, and desktop friendly

## 🔧 How It Works

1. **Time Retrieval**: Uses `Intl.DateTimeFormat` API to get current time in each timezone
2. **Real-time Updates**: Updates every second using `setInterval`
3. **UTC Offset Calculation**: Automatically calculates UTC offset for each timezone
4. **Responsive Grid**: Uses CSS Grid for responsive layout
5. **Clean Up**: Clears interval on component unmount

## 📱 Responsive Design

- **Desktop**: 4 columns grid
- **Tablet**: 2-3 columns grid
- **Mobile**: 1 column grid

## 🚀 Build for Production

```bash
# Create production build
npm run build

# This creates optimized files in the 'build' folder
```

## 🌐 Deploy

You can deploy this app to any platform:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Firebase Hosting
```bash
firebase deploy
```

## 💡 Features to Add

- [ ] Add/remove custom time zones
- [ ] 12/24 hour format toggle
- [ ] Analog clock display
- [ ] Dark/Light theme toggle
- [ ] Timezone search
- [ ] Save favorite timezones
- [ ] Alarm settings
- [ ] Sound notifications

## 🐛 Known Issues

- None currently!

## 🤝 Contributing

Feel free to fork and submit pull requests with improvements!

## 📄 License

MIT License - feel free to use this project for anything.

## 📧 Contact

- GitHub: [@nazmulhaque814](https://github.com/nazmulhaque814)
- Email: nazmulhaquesagor814@gmail.com

---

**Made with ❤️ by Nazmul Haque**
