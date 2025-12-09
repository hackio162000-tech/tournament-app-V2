# Tournament Table Web Application

A complete esports tournament management application built with **React**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Firebase**.

## ✨ Features

- **🏆 Tournament Management**: Create and manage multiple tournaments
- **👥 Team Management**: Add teams with player rosters and optional logos
- **📊 Match Scoring**: Record scores and auto-calculate standings
- **🎯 Auto-Calculations**: 
  - Win/Loss tracking
  - Points calculation (3 for win, 1 for draw)
  - Automatic standings ranking
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🌙 Dark Mode UI**: Professional esports-style dark theme
- **🔗 Shareable Links**: Generate public tournament links
- **💾 Auto-Save**: All data instantly saved to Firebase Firestore
- **📥 Export/Import**: Backup tournaments as JSON

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Firebase account (free)

### Installation

```bash
# Clone or navigate to project
cd "path/to/tournament-table-app"

# Install dependencies
npm install

# Copy environment template
copy .env.local.example .env.local

# Add your Firebase credentials to .env.local
# (See DEPLOYMENT_GUIDE.md for detailed instructions)

# Start development server
npm run dev
```

Visit `http://localhost:5173` and start creating tournaments!

## 📁 Project Structure

```
tournament-table-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Button.tsx
│   │   ├── FormElements.tsx
│   │   ├── StandingsTable.tsx
│   │   ├── MatchesList.tsx
│   │   └── TeamCard.tsx
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   └── TournamentPage.tsx
│   ├── stores/             # Zustand state management
│   │   └── tournamentStore.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── firebase.ts
│   │   ├── tournamentService.ts
│   │   └── helpers.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                 # Static assets
├── index.html             # Entry HTML
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── .env.local.example
└── DEPLOYMENT_GUIDE.md
```

## 🏗️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **Vite** | Fast build tool |
| **TailwindCSS** | Styling |
| **Zustand** | State management |
| **Firebase** | Backend database |
| **React Router** | Page routing |
| **Lucide Icons** | Icon library |

## 🔥 Firebase Setup

See `DEPLOYMENT_GUIDE.md` for detailed Firebase configuration steps.

Quick summary:
1. Create Firebase project
2. Enable Firestore database
3. Get Firebase credentials
4. Add to `.env.local`
5. Deploy!

## 🌐 Deployment

### Deploy to Vercel (Free)

```bash
# Push to GitHub
git push origin main

# Go to vercel.com, connect GitHub repo
# Add environment variables in Vercel dashboard
# Auto-deployed on push!
```

See `DEPLOYMENT_GUIDE.md` for complete step-by-step instructions.

## 📖 Usage Guide

### Create Tournament
1. Click "Create Tournament" on home page
2. Enter name and optional description
3. Set number of rounds
4. Tournament created and ready!

### Add Teams
1. Open tournament
2. Go to "Teams" tab
3. Click "Add Team"
4. Enter team name and player names
5. Optional: Add team logo URL

### Record Scores
1. Go to "Matches" tab
2. Click "Add Match"
3. Select two teams and round
4. Click Edit (✏️) to add scores
5. Enter scores and confirm ✓

### View Standings
1. Go to "Standings" tab
2. See auto-calculated rankings
3. Rankings update instantly when scores change

### Share Tournament
1. Click "Share" button in header
2. Shareable link copied to clipboard
3. Anyone can view at public link

### Export Backup
1. Click "Download" button
2. JSON file downloads
3. Keep as backup or share with others

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize color scheme

### Point System
Modify `calculateStandings()` in `src/utils/helpers.ts`

### Add Features
- Components in `src/components/`
- Pages in `src/pages/`
- Utils in `src/utils/`

## 🔐 Security

### Development
- Firestore in test mode (OK for dev)

### Production
- Update Firestore security rules
- Restrict Firebase API key
- Enable Firebase Authentication (optional)
- Use HTTPS (Vercel handles this)

See `DEPLOYMENT_GUIDE.md` for production security checklist.

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🐛 Troubleshooting

### Firebase not connecting?
- Check `.env.local` file exists
- Verify all environment variables
- Check browser console for errors
- Restart dev server

### Scores not saving?
- Check Firestore in Firebase Console
- Verify security rules allow write
- Clear browser cache
- Check network tab in DevTools

### Build errors?
- Run `npm install` again
- Delete `node_modules` and reinstall
- Clear Vite cache: `rm -rf .vite`
- Check TypeScript errors

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete setup and deployment guide
- [React Docs](https://react.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)

## 🤝 Contributing

Feel free to:
- Add new features
- Improve UI/UX
- Fix bugs
- Optimize performance
- Add documentation

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 🎉 Features Roadmap

- [ ] Team logo upload (not just URL)
- [ ] Player statistics
- [ ] Tournament brackets (single/double elimination)
- [ ] Email notifications
- [ ] Team chat
- [ ] Live match updates
- [ ] Mobile app (React Native)
- [ ] Dark/Light theme toggle
- [ ] Multiple language support

## 💬 Support

Having issues? Check:
1. `DEPLOYMENT_GUIDE.md` for setup help
2. Browser console (F12) for errors
3. Firebase Console for data issues
4. Vercel dashboard for deployment issues

---

**Built with ❤️ for esports tournaments**

Start managing your tournaments today! 🎮🏆
