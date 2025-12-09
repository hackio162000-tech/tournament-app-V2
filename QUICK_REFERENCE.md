# Tournament Table App - Developer Quick Reference

## 🚀 Quick Commands

```bash
# Setup
npm install                 # Install all dependencies
copy .env.local.example .env.local  # Create env file

# Development
npm run dev                # Start dev server (http://localhost:5173)
npm run build              # Build for production
npm run preview            # Preview production build

# Code quality
npm run lint               # Check code style
```

---

## 📂 File Quick Reference

### Entry Points
- `src/main.tsx` - React app entry
- `src/App.tsx` - Main component with routing
- `index.html` - HTML template

### Pages
- `src/pages/HomePage.tsx` - Tournament list & creation
- `src/pages/TournamentPage.tsx` - Tournament management

### Components
- `src/components/Header.tsx` - App header
- `src/components/Button.tsx` - Button variants
- `src/components/FormElements.tsx` - Inputs, selects, textareas
- `src/components/StandingsTable.tsx` - Rankings table
- `src/components/MatchesList.tsx` - Match score display
- `src/components/TeamCard.tsx` - Team card with stats

### State Management
- `src/stores/tournamentStore.ts` - Zustand store with all actions

### Utilities
- `src/utils/firebase.ts` - Firebase & Firestore init
- `src/utils/tournamentService.ts` - Firestore CRUD operations
- `src/utils/helpers.ts` - Calculations, calculations, sharing
- `src/utils/backup.ts` - JSON export/import

### Types
- `src/types/index.ts` - All TypeScript interfaces

### Styling
- `src/index.css` - Global styles & animations
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

### Configuration
- `package.json` - Dependencies & scripts
- `vite.config.ts` - Vite build config
- `tsconfig.json` - TypeScript config
- `.env.local` - Environment variables (create from .example)

### Documentation
- `README.md` - Project overview
- `SETUP_GUIDE.md` - Quick setup (5 min)
- `DEPLOYMENT_GUIDE.md` - Production deployment
- `PROJECT_SUMMARY.md` - Full project details

---

## 🗂️ Folder Structure

```
tournament-table-app/
├── src/
│   ├── components/      ← Reusable UI components
│   ├── pages/          ← Page components
│   ├── stores/         ← Zustand state
│   ├── types/          ← TypeScript types
│   ├── utils/          ← Utilities & services
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/             ← Static files
├── .env.local          ← Your Firebase config
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── SETUP_GUIDE.md
├── DEPLOYMENT_GUIDE.md
└── PROJECT_SUMMARY.md
```

---

## 🔧 Adding New Features

### Add a New Page
1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Import in App component

Example:
```typescript
import { NewPage } from './pages/NewPage';

// In Routes:
<Route path="/newpage" element={<NewPage />} />
```

### Add a New Component
1. Create `src/components/NewComponent.tsx`
2. Export as React.FC
3. Import and use in pages

### Add New State
1. Add to `TournamentStore` interface in `src/types/index.ts`
2. Add implementation in `src/stores/tournamentStore.ts`
3. Use with `useTournamentStore()` hook

### Add New Firestore Operation
1. Add method in `TournamentService` class
2. Import in store
3. Call in store action

---

## 🎨 Styling Guide

### Colors (Tailwind)
```css
/* Primary */
bg-blue-600, text-blue-400, border-blue-500

/* Success */
bg-green-600, text-green-400

/* Danger */
bg-red-600, text-red-400

/* Dark Background */
bg-gray-900 (darkest)
bg-gray-800 (darker)
bg-gray-700 (dark)

/* Text */
text-white (bright)
text-gray-400 (dim)
text-gray-500 (dimmer)
```

### Common Patterns
```tsx
// Dark card
className="bg-gray-800 border border-gray-700 rounded-lg p-4"

// Button primary
className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"

// Input field
className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"

// Table header
className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-white font-bold"
```

---

## 🔑 Key Functions

### State Management
```typescript
// In any component:
const store = useTournamentStore();

// Access state
store.currentTournament
store.tournaments

// Call actions
store.createTournament(name)
store.addTeam(tournamentId, team)
store.updateScore(tournamentId, matchId, team1Score, team2Score)
```

### Calculations
```typescript
// Auto-calculate standings
calculateStandings(teams, matches)

// Get team stats
getTeamStats(team, matches)

// Generate shareable link
generateTournamentLink(tournamentId)

// Copy to clipboard
copyToClipboard(text)
```

### Firebase
```typescript
// In tournament service:
TournamentService.createTournament(tournament)
TournamentService.getTournament(id)
TournamentService.getAllTournaments()
TournamentService.updateTournament(id, tournament)
TournamentService.deleteTournament(id)
```

### Backup
```typescript
// Export tournament
TournamentBackup.exportToJSON(tournament)
TournamentBackup.exportAsFile(tournament)

// Import tournament
TournamentBackup.importFromFile()

// Validate
TournamentBackup.validateTournament(data)
```

---

## 🚨 Debugging Tips

### Check State
```tsx
// In component:
const store = useTournamentStore();
console.log('Current tournament:', store.currentTournament);
```

### Monitor Firebase
1. Firebase Console → Firestore Database
2. Check `tournaments` collection
3. Verify documents are being created/updated

### Browser DevTools
- **Console**: Check for errors
- **Network**: Watch API calls
- **Application**: Check .env.local is loaded
- **React DevTools**: Inspect component state

### Common Issues
| Issue | Check |
|-------|-------|
| Data not saving | Firebase credentials, network, Firestore rules |
| Calculations wrong | Check calculateStandings() in helpers.ts |
| Component not updating | Zustand store is notified of change |
| Styles not applying | Tailwind CSS is running, clear cache |
| Build fails | Check TypeScript errors, npm install again |

---

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes, commit
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request on GitHub

# After approval, merge to main
git checkout main
git merge feature/new-feature
git push origin main
```

---

## 📦 Dependencies Overview

| Package | Size | Purpose |
|---------|------|---------|
| react | ~42KB | UI library |
| react-dom | ~40KB | DOM rendering |
| react-router-dom | ~37KB | Page routing |
| zustand | ~2KB | State management |
| firebase | ~30KB | Backend & database |
| tailwindcss | ~10KB | Styling framework |
| lucide-react | ~20KB | Icon library |
| typescript | N/A | Type safety |
| vite | N/A | Build tool |

**Total Bundle: ~150KB (gzipped)**

---

## 🚀 Deployment Checklist

Before deploying:
- [ ] `.env.local` not committed (in .gitignore)
- [ ] No console errors in dev
- [ ] Firebase rules updated for production
- [ ] Domain added to Firebase authorized list
- [ ] All features tested locally
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] README.md updated if needed

For Vercel:
- [ ] Code pushed to GitHub
- [ ] Environment variables added in Vercel dashboard
- [ ] Deployment triggered
- [ ] Domain verified in Firebase
- [ ] App accessible from Vercel URL
- [ ] Custom domain configured (optional)

---

## 📚 Learning Resources

### React & TypeScript
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Router](https://reactrouter.com/)

### Styling
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PostCSS](https://postcss.org/)

### State Management
- [Zustand](https://github.com/pmndrs/zustand)
- [Zustand Examples](https://github.com/pmndrs/zustand/tree/main/examples)

### Backend
- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)

### Deployment
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

## 💡 Pro Tips

1. **Use Firefox DevTools** - Better React inspection
2. **Enable Strict Mode** - Catches bugs early
3. **Use TypeScript** - Prevents runtime errors
4. **Test locally first** - Before deploying
5. **Commit often** - Small, meaningful commits
6. **Use .env files** - Never hardcode secrets
7. **Read error messages** - They're usually helpful
8. **Check browser console** - First step in debugging
9. **Use Firestore indexing** - For complex queries
10. **Monitor Vercel logs** - For deployment issues

---

## ✨ Code Examples

### Add Team with Players
```typescript
const handleAddTeam = async () => {
  const newTeam: Team = {
    id: generateId(),
    name: 'Team Name',
    players: [
      { id: '1', name: 'Player 1' },
      { id: '2', name: 'Player 2' }
    ],
    wins: 0,
    losses: 0,
    points: 0
  };
  
  await addTeam(tournamentId, newTeam);
};
```

### Record Match Score
```typescript
const handleRecordScore = async (matchId: string, team1Score: number, team2Score: number) => {
  await updateScore(tournamentId, matchId, team1Score, team2Score);
  // Standings automatically recalculated!
};
```

### Generate Shareable Link
```typescript
const handleShare = async () => {
  const link = generateTournamentLink(tournamentId);
  await copyToClipboard(link);
  setNotification('Link copied!');
};
```

---

## 🎯 Next Steps

1. **Local Development** → `npm run dev`
2. **Firebase Setup** → Follow SETUP_GUIDE.md
3. **Create Tournament** → Test core features
4. **Deploy to Vercel** → Follow DEPLOYMENT_GUIDE.md
5. **Share with Others** → Generate shareable link
6. **Customize** → Modify colors, add features
7. **Monitor** → Check Vercel logs, Firebase stats

---

**Happy coding! 🚀**

Need help? Check the docs or inspect browser console for errors.
