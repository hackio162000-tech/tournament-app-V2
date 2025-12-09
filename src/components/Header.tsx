import React from 'react';
import { Trophy, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Tournament Table</h1>
              <p className="text-gray-400 text-sm">Manage your esports tournaments</p>
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-semibold text-sm">{user.displayName || 'User'}</p>
                <p className="text-gray-400 text-xs">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
