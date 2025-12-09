# Tournament Table App - Setup Instructions

## ⚡ 5-Minute Quick Start

### 1. Install Node.js
Download and install from [nodejs.org](https://nodejs.org/) (version 16+)

### 2. Install Dependencies
```bash
cd "g:\app 2.2"
npm install
```

### 3. Create Firebase Account
- Go to [firebase.google.com](https://firebase.google.com/)
- Click "Get Started" (free)
- Create a new project

### 4. Setup Firestore
- In Firebase Console, click "Firestore Database"
- Click "Create Database"
- Select "Start in test mode"
- Click "Create"

### 5. Get Firebase Credentials
- Click Project Settings (gear icon)
- Under "Your apps", click Web (</> icon)
- Copy the config object (the one with apiKey, authDomain, etc.)

### 6. Create .env.local
Create a file named `.env.local` in the project root:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

Replace `YOUR_*` with values from Firebase config.

### 7. Run the App
```bash
npm run dev
```

Open `http://localhost:5173` in your browser. Done! 🎉

---

## 🔥 Detailed Firebase Setup

### Create Firebase Project (Step-by-Step)

1. **Go to Firebase Console**
   - Visit https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "Add project"
   - Enter name: `tournament-table`
   - Choose your region
   - Click "Create project"
   - Wait for setup to complete

3. **Add Web App**
   - Click "Web" icon (</>)
   - Enter app name: `tournament-table-web`
   - Click "Register app"
   - Copy the Firebase config (save it somewhere!)

4. **Enable Firestore**
   - Click "Firestore Database" in left menu
   - Click "Create database"
   - Select region: `us-central1`
   - Select "Start in test mode"
   - Click "Create"

### Firebase Config Looks Like:
```javascript
{
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "tournament-table-xxxxx.firebaseapp.com",
  projectId: "tournament-table-xxxxx",
  storageBucket: "tournament-table-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
}
```

### Map to .env.local:
```env
VITE_FIREBASE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=tournament-table-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tournament-table-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=tournament-table-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

---

## 🚀 Running Locally

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

---

## 🌐 Deploy to Vercel (Free)

### Prerequisites
- Code pushed to GitHub
- Vercel account (free at vercel.com)

### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add files
git add .

# Commit
git commit -m "Initial commit"

# Create repo on github.com and push
git remote add origin https://github.com/YOUR_USERNAME/tournament-table-app.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select `tournament-table-app` repo
5. In "Environment Variables" section, add:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
6. Click "Deploy"

### Step 3: Authorize Your Domain in Firebase
1. Firebase Console → Project Settings
2. Go to "Authentication" tab
3. Click "Authorized domains"
4. Add your Vercel URL (e.g., `tournament-table-app.vercel.app`)
5. Save

Done! Your app is live! 🎉

---

## 📱 App Features

### Home Page
- ✅ Create new tournaments
- ✅ View list of tournaments
- ✅ Click to open tournament

### Tournament Page
- ✅ **Standings Tab**: Auto-ranked team table
- ✅ **Teams Tab**: Add/edit teams with players
- ✅ **Matches Tab**: Record match scores

### Auto Features
- ✅ Standings update instantly
- ✅ Points auto-calculated
- ✅ Wins/losses tracked
- ✅ Data auto-saved to Firebase

### Sharing
- ✅ Generate shareable public link
- ✅ Export tournament as JSON
- ✅ Download backup

---

## 🛠️ Project Structure

```
tournament-table-app/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components (Home, Tournament)
│   ├── stores/         # Zustand store
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Firebase, helpers, backup utilities
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # React entry point
│   └── index.css       # Global styles
├── public/             # Static files
├── .env.local          # Environment variables (create this!)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## ❓ FAQ

### Q: Can I use this commercially?
**A:** Yes! MIT License - use anywhere.

### Q: Is Firebase free?
**A:** Yes! Free tier includes 1GB storage, plenty for tournaments.

### Q: How do I backup tournaments?
**A:** Click "Download" button in tournament header. Downloads as JSON.

### Q: Can users edit other's tournaments?
**A:** Only in test mode (development). Add authentication for production.

### Q: Works on mobile?
**A:** Yes! Fully responsive design.

### Q: Can I change colors?
**A:** Yes! Edit `tailwind.config.js`

### Q: What if I forget environment variables?
**A:** App won't connect to Firebase. Check `.env.local` file.

### Q: How do I troubleshoot?
**A:** Open browser console (F12) and check error messages.

---

## 🐛 Troubleshooting

### Issue: "npm: command not found"
**Solution:** Install Node.js from nodejs.org

### Issue: Port 5173 already in use
**Solution:** 
```bash
npm run dev -- --port 5174
```

### Issue: Firebase connection fails
**Solution:**
1. Check `.env.local` exists
2. Verify all environment variable names
3. Restart dev server
4. Check browser console (F12) for errors

### Issue: "Permission denied" on Firestore
**Solution:**
- Make sure database is in "Test Mode"
- Or update security rules (see DEPLOYMENT_GUIDE.md)

### Issue: Page shows "not found"
**Solution:**
- Make sure you're accessing `/tournament?id=XXXXX` (note: id= parameter)
- Check browser console for errors

### Issue: Scores not saving
**Solution:**
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab - ensure POST requests succeed
4. Verify Firebase credentials are correct

---

## ✨ Next Steps

1. ✅ Local development working
2. ✅ Firebase connected
3. ✅ Create first tournament
4. ✅ Add teams and matches
5. ✅ Deploy to Vercel
6. ✅ Share with friends!

---

## 📞 Need Help?

- Check error messages in browser console (F12)
- See DEPLOYMENT_GUIDE.md for more details
- Check Firebase Console for data issues
- Review code comments for implementation details

---

**Happy tournament managing! 🏆**
