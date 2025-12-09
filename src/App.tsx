import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TournamentPage } from './pages/TournamentPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import './index.css';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes - load first */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tournament"
          element={
            <ProtectedRoute>
              <TournamentPage />
            </ProtectedRoute>
          }
        />

        {/* Default route - redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
