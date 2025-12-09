import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/Button';
import { Input } from '../components/FormElements';
import { Header } from '../components/Header';
import { UserPlus } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, setError } = useAuthStore();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    displayName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};

    if (!displayName) errors.displayName = 'Name is required';
    else if (displayName.length < 2) errors.displayName = 'Name must be at least 2 characters';

    if (!email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format';

    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

    if (!confirmPassword) errors.confirmPassword = 'Please confirm password';
    else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      await register(email, password, displayName);
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
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white text-center mb-2">Create Account</h1>
            <p className="text-gray-400 text-center mb-6">Start managing tournaments today</p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                error={validationErrors.displayName}
                disabled={isLoading}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={validationErrors.email}
                disabled={isLoading}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={validationErrors.password}
                disabled={isLoading}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={validationErrors.confirmPassword}
                disabled={isLoading}
              />

              <Button
                type="submit"
                variant="success"
                size="md"
                className="w-full"
                disabled={isLoading}
              >
                <UserPlus className="w-4 h-4 mr-2 inline" />
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm text-center mb-4">
                Already have an account?
              </p>
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>

            {/* Password requirements */}
            <div className="mt-6 p-3 bg-gray-700/30 rounded-lg">
              <p className="text-xs text-gray-400 font-semibold mb-2">Password Requirements:</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>✓ Minimum 6 characters</li>
                <li>✓ Mix of letters and numbers</li>
                <li>✓ Confirm password must match</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
