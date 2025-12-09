#!/bin/bash
# Tournament Table App - Installation Verification Script

echo "🏆 Tournament Table Web Application - Installation Check"
echo "=========================================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "  Node.js: $NODE_VERSION ✅"
else
    echo "  Node.js: NOT INSTALLED ❌"
    echo "  Install from: https://nodejs.org/"
    exit 1
fi

echo ""
echo "✓ Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "  npm: $NPM_VERSION ✅"
else
    echo "  npm: NOT INSTALLED ❌"
    exit 1
fi

echo ""
echo "✓ Checking project files..."

FILES=(
    "package.json"
    "src/App.tsx"
    "src/main.tsx"
    "src/pages/HomePage.tsx"
    "src/pages/TournamentPage.tsx"
    "src/stores/tournamentStore.ts"
    "vite.config.ts"
    "tsconfig.json"
    "tailwind.config.js"
    "README.md"
)

MISSING=0
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  $file ✅"
    else
        echo "  $file ❌"
        MISSING=$((MISSING + 1))
    fi
done

if [ $MISSING -eq 0 ]; then
    echo ""
    echo "✅ All project files found!"
else
    echo ""
    echo "❌ Some files are missing ($MISSING)"
    exit 1
fi

echo ""
echo "=========================================================="
echo "✨ Installation Check Complete!"
echo ""
echo "Next steps:"
echo "1. npm install          (Install dependencies)"
echo "2. Setup .env.local     (Add Firebase credentials)"
echo "3. npm run dev          (Start development server)"
echo "4. Follow SETUP_GUIDE.md for detailed instructions"
echo ""
