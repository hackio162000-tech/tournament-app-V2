@echo off
REM Tournament Table App - Installation Verification Script (Windows)

echo.
echo ========================================================
echo Tournament Table Web Application - Installation Check
echo ========================================================
echo.

REM Check Node.js
echo Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo   Node.js: %NODE_VERSION% [OK]
) else (
    echo   Node.js: NOT INSTALLED [FAIL]
    echo   Install from: https://nodejs.org/
    exit /b 1
)

echo.
echo Checking npm...
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo   npm: %NPM_VERSION% [OK]
) else (
    echo   npm: NOT INSTALLED [FAIL]
    exit /b 1
)

echo.
echo Checking project files...

setlocal enabledelayedexpansion
set MISSING=0

for %%F in (
    "package.json"
    "src\App.tsx"
    "src\main.tsx"
    "src\pages\HomePage.tsx"
    "src\pages\TournamentPage.tsx"
    "src\stores\tournamentStore.ts"
    "vite.config.ts"
    "tsconfig.json"
    "tailwind.config.js"
    "README.md"
) do (
    if exist %%F (
        echo   %%F [OK]
    ) else (
        echo   %%F [MISSING]
        set /a MISSING=!MISSING!+1
    )
)

echo.
echo ========================================================

if %MISSING% EQU 0 (
    echo [SUCCESS] All project files found!
    echo.
    echo Next steps:
    echo 1. npm install          ^(Install dependencies^)
    echo 2. Setup .env.local     ^(Add Firebase credentials^)
    echo 3. npm run dev          ^(Start development server^)
    echo 4. Follow SETUP_GUIDE.md for detailed instructions
    echo.
    exit /b 0
) else (
    echo [ERROR] Some files are missing (%MISSING%)
    exit /b 1
)
