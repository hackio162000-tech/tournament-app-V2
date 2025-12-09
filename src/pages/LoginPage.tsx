import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/Button';
import { Input } from '../components/FormElements';
import { Header } from '../components/Header';
import { Lock, LogIn } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, setError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    if (!email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format';

    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      await login(email, password);
      navigate('/home', { replace: true });
    } catch {
      // Error is already set in the store
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white text-center mb-2">Login</h1>
            <p className="text-gray-400 text-center mb-6">Sign in to your tournament account</p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                error={validationErrors.email}
                disabled={isLoading}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                error={validationErrors.password}
                disabled={isLoading}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                disabled={isLoading}
              >
                <LogIn className="w-4 h-4 mr-2 inline" />
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm text-center mb-4">
                Don't have an account?
              </p>
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => navigate('/register')}
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
