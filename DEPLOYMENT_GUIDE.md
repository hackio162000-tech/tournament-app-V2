# Tournament Table Web Application - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Firebase Configuration](#firebase-configuration)
3. [Deployment to Vercel](#deployment-to-vercel)
4. [Troubleshooting](#troubleshooting)
5. [Features Guide](#features-guide)

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- npm or yarn package manager
- Git ([Download](https://git-scm.com/))
- A Firebase account ([Create Free](https://firebase.google.com/))

### Step 1: Install Dependencies

```bash
# Navigate to project directory
cd "g:\app 2.2"

# Install dependencies
npm install
```

### Step 2: Set Up Environment Variables

1. Copy the example env file:
```bash
copy .env.local.example .env.local
```

2. Add your Firebase credentials to `.env.local` (see Firebase setup below)

### Step 3: Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

---

## 🔥 Firebase Configuration

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `tournament-table-app`
4. Accept terms and click **Create project**
5. Wait for initialization to complete

### Step 2: Enable Firestore Database

1. In Firebase Console, click **Firestore Database** (left sidebar)
2. Click **Create database**
3. Select **Start in test mode** (for development)
   - ⚠️ For production, update security rules (see Step 5)
4. Choose region: **us-central1** (or nearest to you)
5. Click **Create**

### Step 3: Get Firebase Config

1. Click **Project Settings** (gear icon, top left)
2. Scroll to "Your apps" section
3. Click **Web** icon (</>)
4. Register app with name `tournament-table`
5. Copy the Firebase config object (you'll see it after creating the app)

The config looks like this:
```javascript
{
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
}
```

### Step 4: Add Config to .env.local

Copy each value from your Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSyBxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=tournament-table-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tournament-table-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=tournament-table-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

### Step 5: Update Firestore Security Rules (for Production)

1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Replace the default rules with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tournaments/{document=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

### Step 6: Test Connection

```bash
npm run dev
```

Visit `http://localhost:5173` and try creating a tournament. If it saves to Firestore, you're all set!

---

## 📦 Deployment to Vercel

### Step 1: Prepare for Deployment

1. Make sure your project is in a Git repository:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a repository on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Create a new repository named `tournament-table-app`
   - Follow the instructions to push your code

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up or sign in with your GitHub account
3. Click **"New Project"**
4. Select your `tournament-table-app` repository
5. Vercel will detect it as a Vite project
6. Click **Environment Variables** and add all your Firebase config:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

7. Click **Deploy**

⏳ Vercel will build and deploy your app. You'll get a live URL like `https://tournament-table-app.vercel.app`

### Step 3: Update Firebase Authorized Domains

1. Go to Firebase Console → **Project Settings**
2. Go to **Authentication** tab
3. Click **Authorized domains**
4. Add your Vercel domain: `tournament-table-app.vercel.app`
5. Save

---

## 🐛 Troubleshooting

### Issue: "Firebase config not loading"
**Solution:**
- Check `.env.local` file exists in root directory
- Verify all environment variable names match exactly
- Restart dev server after updating `.env.local`
- Check browser console for error messages

### Issue: "Permission denied" on Firestore
**Solution:**
- Make sure Firestore is in **Test Mode** for development
- Or update security rules as shown in Step 5
- Clear browser cache and try again

### Issue: "Tournaments not saving"
**Solution:**
- Open browser DevTools (F12)
- Go to Console tab
- Check for error messages
- Verify Firebase credentials are correct
- Check Firestore Database rules allow write operations

### Issue: "Build fails on Vercel"
**Solution:**
- Check Vercel deployment logs for specific errors
- Make sure all dependencies are in `package.json`
- Verify TypeScript types are correct
- Try: `npm run build` locally to test

---

## 📚 Features Guide

### Creating a Tournament
1. Click **"Create Tournament"** button
2. Enter tournament name and optional description
3. Set number of rounds (default: 5)
4. Click **Create Tournament**

### Managing Teams
1. Open a tournament
2. Go to **Teams** tab
3. Click **"Add Team"**
4. Enter team name
5. Add players (comma-separated)
6. Optional: Add team logo URL
7. Click **Add Team**

### Recording Scores
1. Go to **Matches** tab
2. Click **"Add Match"**
3. Select two teams and round number
4. Click **Add Match**
5. Click **Edit** (pencil icon) on a match to add scores
6. Enter scores and click **✓** to confirm

### Sharing Tournament
1. Click **Share** button in tournament header
2. Shareable link is copied to clipboard
3. Share with others - they can view standings

### Exporting Data
1. Click **Download** button in tournament header
2. JSON backup of entire tournament downloads
3. Can be imported later

### Auto-Calculations
- **Wins/Losses:** Automatically calculated from match results
- **Points:** 3 points for win, 1 point for draw
- **Standings:** Auto-sorted by points, then wins
- All updates happen instantly

---

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.js` to modify colors:
```javascript
colors: {
  // Change from blue to purple
  primary: '#a855f7',
  // ... other colors
}
```

### Add Team Logos
When adding a team, paste a valid image URL in the "Logo URL" field. Supports:
- PNG, JPG, GIF, SVG
- Public URLs only

### Modify Point System
In `src/utils/helpers.ts`, change the `calculateStandings` function:
```typescript
// Change from 3 points for win to 5 points
team1.points += 5; // was 3
```

---

## 📱 Mobile Optimization

The app is fully responsive and works on:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablets (iPad, Android tablets)
- ✅ Mobile phones (iPhone, Android)

Tested on:
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Mobile Safari (iOS 14+)

---

## 🔐 Security Best Practices

### For Production:
1. ✅ Update Firestore security rules (not test mode)
2. ✅ Enable Firebase Authentication
3. ✅ Restrict API key to web domain
4. ✅ Use HTTPS only (Vercel handles this)
5. ✅ Enable DDoS protection on Firebase

### Firebase Console:
1. Go to Project Settings
2. Restrict API key to:
   - HTTP referrers
   - Only your Vercel domain

---

## 📞 Getting Help

### Common Resources:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Check Logs:
- **Local Dev:** Browser Console (F12)
- **Vercel:** Deployment logs in dashboard
- **Firebase:** Console logs in Firebase Console

---

## ✨ Quick Checklist

- [ ] Node.js installed
- [ ] Project cloned/created
- [ ] Dependencies installed: `npm install`
- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] Environment variables added to `.env.local`
- [ ] Dev server running: `npm run dev`
- [ ] Can create tournaments
- [ ] Can add teams
- [ ] Can record scores
- [ ] Data persists in Firestore
- [ ] Code pushed to GitHub
- [ ] Deployed on Vercel
- [ ] Firebase domain authorized
- [ ] Live app accessible at Vercel URL

---

## 🎉 You're Ready!

Your Tournament Table application is now live! 

- 🏠 Home Page: View and create tournaments
- 🏆 Tournament Page: Manage teams, matches, and standings
- 📊 Auto-updating: All calculations happen instantly
- 🌍 Public Sharing: Generate shareable links
- 📱 Responsive: Works on all devices
- ☁️ Cloud Backed: Data saved to Firebase
- 🚀 Deployed: Live on Vercel's free tier

Start by creating your first tournament! 🎮
