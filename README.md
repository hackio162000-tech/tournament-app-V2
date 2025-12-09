# Tournament Table Web Application

A complete production-ready esports tournament management application with user authentication, auto-backup, and real-time standings calculation.

## ✨ Features

- **🔐 User Authentication**: Register, login, and manage your tournaments securely
- **🏆 Tournament Management**: Create and manage multiple tournaments
- **👥 Team Management**: Add teams with player rosters
- **📊 Match Scoring**: Record scores and auto-calculate standings
- **💾 Auto-Backup**: Automatic backups on every operation, keep last 10 versions
- **🎯 Auto-Calculations**: Win/Loss tracking, Points calculation, Automatic standings ranking
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🌙 Dark Mode UI**: Professional esports-style dark theme
- **💾 Auto-Save**: All data instantly saved to Firebase Firestore
- **📥 Export/Import**: Backup tournaments as JSON

## 🚀 Quick Start - Local Development

### Prerequisites
- Node.js 16+
- npm
- Firebase account (free at https://firebase.google.com)

### Installation

```bash
# 1. Clone repository (or navigate to project folder)
cd "path/to/tournament-table-app"

# 2. Install dependencies
npm install

# 3. Create .env.local file with Firebase credentials
# Add these lines to .env.local:
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# 4. Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser. You'll be redirected to login page.

## 📝 Step-by-Step Usage

### 1. Create Your Account

1. Go to `http://localhost:5173/login`
2. Click "Create Account" button
3. Fill in the registration form:
   - **Full Name**: Your name
   - **Email**: Your email address
   - **Password**: 6+ character password
   - **Confirm Password**: Repeat password
4. Click "Register"
5. ✅ You're automatically logged in and see the Dashboard

### 2. Create a Tournament

1. Click "Create New Tournament" button on Dashboard
2. Fill tournament details:
   - **Tournament Name** (required): e.g., "Regional Finals 2025"
   - **Description** (optional): Tournament details
   - **Total Rounds** (default 5): How many rounds to play
3. Click "Create Tournament"
4. ✅ Your tournament is created and auto-backed up

### 3. Add Teams

1. In Tournament page, scroll to "Add Team" section
2. Enter team information:
   - **Team Name**: e.g., "Phoenix Legends"
   - **Player Names**: Comma-separated, e.g., "John, Mike, Sarah"
3. Click "Add Team"
4. ✅ Team appears in Standings table, auto-backup created

### 4. Schedule Matches

1. Scroll to "Matches" section
2. Click "Schedule New Match"
3. Select:
   - **Team 1**: First competing team
   - **Team 2**: Second competing team
   - **Round**: Round number (1-5 by default)
4. Click "Add Match"
5. ✅ Match appears in Matches list, auto-backup created

### 5. Record Match Scores

1. Find the match in Matches list
2. Click the score editing button (pencil icon)
3. Enter scores:
   - **Team 1 Score**: Points for team 1
   - **Team 2 Score**: Points for team 2
4. Click "Save Score"
5. ✅ Standings automatically update, auto-backup created

### 6. View Standings

Standings update automatically showing:
- Team position/rank
- Wins count
- Losses count
- Total points

### 7. Manage Tournament

- **Edit Tournament**: Change name/description/rounds
- **Delete Tournament**: Permanently remove (backed up first)
- **Export**: Download tournament as JSON file

### 8. Logout

Click "Logout" button in header (top right) to sign out.

## 🌐 Deploy to Vercel (FREE)

### Prerequisites
- GitHub account (free)
- Vercel account (free)
- Your code pushed to GitHub

### Step 1: Push Code to GitHub

```bash
# If git not initialized
git init

# Configure git (one time)
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Add and commit all files
git add .
git commit -m "Initial commit: Tournament app with auth and auto-backup"

# Create new repository on GitHub.com
# Then push your code:
git remote add origin https://github.com/YOUR-USERNAME/tournament-table-app.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Sign In"
3. Click "New Project"
4. Select "Import Git Repository"
5. Paste your GitHub repo URL: `https://github.com/YOUR-USERNAME/tournament-table-app.git`
6. Click "Import"

### Step 3: Configure Environment Variables

1. In Vercel project settings, go to "Environment Variables"
2. Add each Firebase variable:
   - Name: `VITE_FIREBASE_API_KEY`
   - Value: `your_value_from_firebase`
3. Repeat for all variables:
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID
   - VITE_FIREBASE_MEASUREMENT_ID

4. Click "Save"

### Step 4: Build Settings

Vercel auto-detects Vite settings. Verify:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 5: Deploy

1. Click "Deploy" button
2. Wait for build to complete (usually 2-3 minutes)
3. ✅ Your app is live at `https://tournament-table-app-YOUR-USERNAME.vercel.app`

### Step 6: Custom Domain (Optional)

To use your own domain:
1. In Vercel Settings → Domains
2. Enter your custom domain
3. Follow DNS instructions from your domain provider

## 🔒 Security & Privacy

### Your Data
- All data stored securely in Firebase
- Only you can access your tournaments
- Auto-backups kept for data safety

### Credentials
- Never share your Firebase credentials
- `.env.local` is git-ignored (never uploaded)
- Vercel environment variables are encrypted

### Password Security
- Passwords hashed by Firebase
- Use strong, unique passwords
- Password reset available via email

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Button.tsx
│   ├── FormElements.tsx
│   ├── Header.tsx
│   ├── MatchesList.tsx
│   ├── ProtectedRoute.tsx  # Auth protection
│   ├── StandingsTable.tsx
│   └── TeamCard.tsx
├── pages/                   # Full page components
│   ├── HomePage.tsx        # Dashboard
│   ├── LoginPage.tsx       # Login
│   ├── RegisterPage.tsx    # Registration
│   └── TournamentPage.tsx  # Tournament management
├── stores/                  # Zustand state management
│   ├── authStore.ts        # Authentication state
│   └── tournamentStore.ts  # Tournament data state
├── utils/                   # Utility functions
│   ├── authService.ts      # Firebase auth
│   ├── autoBackupService.ts # Backup management
│   ├── firebase.ts         # Firebase config
│   ├── helpers.ts          # Helper functions
│   └── tournamentService.ts # Database operations
├── types/                   # TypeScript interfaces
│   └── index.ts
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## 🛠️ Build Commands

```bash
# Development server (auto-reload)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Check for errors (if configured)
npm run lint
```

## 🔧 Environment Variables

Get these from Firebase Console:
1. Go to https://console.firebase.google.com
2. Select your project
3. Click "Project Settings" (gear icon)
4. Scroll to "Your apps" section
5. Copy values from web app config

| Variable | Description |
|----------|-------------|
| VITE_FIREBASE_API_KEY | API key for authentication |
| VITE_FIREBASE_AUTH_DOMAIN | Auth domain (*.firebaseapp.com) |
| VITE_FIREBASE_PROJECT_ID | Firebase project ID |
| VITE_FIREBASE_STORAGE_BUCKET | Cloud storage bucket |
| VITE_FIREBASE_MESSAGING_SENDER_ID | FCM sender ID |
| VITE_FIREBASE_APP_ID | Firebase app ID |
| VITE_FIREBASE_MEASUREMENT_ID | Analytics ID (optional) |

## ❓ Troubleshooting

### Application won't load / White screen
- Check browser console (F12 → Console tab)
- Verify `.env.local` has all Firebase credentials
- Restart dev server: `npm run dev`

### Firebase initialization error
- Verify project ID matches Firebase Console
- Check all credentials are correct and not truncated
- Firestore and Authentication must be enabled in Firebase

### Can't login/register
- Verify email format is correct
- Password must be 6+ characters
- Check Firebase Authentication is enabled
- Try creating account with test email

### Changes not saving to database
- Check internet connection
- Verify Firebase Firestore is enabled
- Check Firebase security rules allow writes
- Look at browser console for error messages

### Slow performance
- Check network tab (F12) for slow requests
- Firestore may need optimization for large tournaments
- Consider archiving old tournaments

## 📚 Learn More

- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Store](https://github.com/pmndrs/zustand)

## 📊 Database

### Firestore Collections

**tournaments**
```
{
  id: string,
  userId: string (owner),
  name: string,
  description: string,
  totalRounds: number,
  teams: Team[],
  matches: Match[],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**backups**
```
{
  id: string,
  userId: string,
  tournamentId: string,
  backupData: Tournament,
  createdAt: timestamp,
  backupType: "auto" | "manual"
}
```

## 📄 Tech Stack

- **React** 18 - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Firebase** - Backend (Auth, Firestore, Storage)
- **React Router** - Navigation
- **Lucide Icons** - Icons

## 📝 License

This project is open source and available under the MIT License.
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
