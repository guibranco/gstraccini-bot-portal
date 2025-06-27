import React, { useState } from 'react';
import { Github, KeyRound, Mail, Fingerprint, Smartphone, ArrowRight, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';

// Mock user data
const MOCK_USERS = {
  'test@example.com': {
    password: 'password123',
    twoFactorMethods: ['fido', 'authenticator', 'email', 'recovery']
  },
  'admin@example.com': {
    password: 'admin123',
    twoFactorMethods: ['authenticator', 'email']
  }
};

// Mock 2FA verification codes
const MOCK_2FA_CODES = {
  authenticator: '123456',
  email: '654321',
  recovery: 'R123456789',
};

interface TwoFactorModalProps {
  method: string;
  onClose: () => void;
  onVerify: (code: string) => void;
}

const TwoFactorVerificationModal: React.FC<TwoFactorModalProps> = ({ method, onClose, onVerify }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock verification
    if (MOCK_2FA_CODES[method as keyof typeof MOCK_2FA_CODES] === code) {
      onVerify(code);
    } else {
      setError('Invalid verification code');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">Enter Verification Code</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              {method === 'authenticator' && 'Enter 6-digit code from your authenticator app'}
              {method === 'email' && 'Enter 6-digit code sent to your email'}
              {method === 'recovery' && 'Enter your 10-digit recovery code'}
              {method === 'fido' && 'Verify with your security key'}
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter code"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Verify
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface TwoFactorMethodsModalProps {
  methods: string[];
  onClose: () => void;
  onSelect: (method: string) => void;
}

const TwoFactorMethodsModal: React.FC<TwoFactorMethodsModalProps> = ({ methods, onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">Select 2FA Method</h2>
        <div className="space-y-3">
          {methods.includes('fido') && (
            <button
              onClick={() => onSelect('fido')}
              className="w-full flex items-center justify-between p-4 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Fingerprint className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Security Key (FIDO)</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>
          )}
          {methods.includes('authenticator') && (
            <button
              onClick={() => onSelect('authenticator')}
              className="w-full flex items-center justify-between p-4 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Authenticator App</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>
          )}
          {methods.includes('email') && (
            <button
              onClick={() => onSelect('email')}
              className="w-full flex items-center justify-between p-4 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Email Code (6-digit)</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>
          )}
          {methods.includes('recovery') && (
            <button
              onClick={() => onSelect('recovery')}
              className="w-full flex items-center justify-between p-4 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <KeyRound className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Recovery Code (10-digit)</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTwoFactorMethods, setShowTwoFactorMethods] = useState(false);
  const [showTwoFactorVerification, setShowTwoFactorVerification] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [twoFactorMethods, setTwoFactorMethods] = useState<string[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock authentication
      const user = MOCK_USERS[email as keyof typeof MOCK_USERS];
      
      if (!user) {
        setError('Invalid email or password');
        return;
      }

      if (user.password !== password) {
        setError('Invalid email or password');
        return;
      }

      // Set available 2FA methods and show selection modal
      setTwoFactorMethods(user.twoFactorMethods);
      setShowTwoFactorMethods(true);
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    // Mock GitHub login
    login();
    navigate('/dashboard');
  };

  const handleTwoFactorMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setShowTwoFactorMethods(false);
    setShowTwoFactorVerification(true);

    // If FIDO is selected, auto-verify after a delay
    if (method === 'fido') {
      setTimeout(() => {
        login();
        navigate('/dashboard');
      }, 1500);
    }
  };

  const handleTwoFactorVerification = (code: string) => {
    // Mock verification success
    setShowTwoFactorVerification(false);
    login();
    navigate('/dashboard');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password', { state: { email } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <LandingHeader />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Bot className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to GStraccini Bot
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your GitHub automation dashboard
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200">
            <button
              onClick={handleGitHubLogin}
              className="w-full flex justify-center items-center gap-3 px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <Github className="h-5 w-5" />
              Continue with GitHub
            </button>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="test@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="password123"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="text-center text-sm text-gray-600">
                <p>Demo credentials:</p>
                <p className="font-mono text-xs mt-1">test@example.com / password123</p>
                <p className="font-mono text-xs">admin@example.com / admin123</p>
              </div>
            </div>
          </div>
        </div>

        {showTwoFactorMethods && (
          <TwoFactorMethodsModal
            methods={twoFactorMethods}
            onClose={() => setShowTwoFactorMethods(false)}
            onSelect={handleTwoFactorMethodSelect}
          />
        )}

        {showTwoFactorVerification && (
          <TwoFactorVerificationModal
            method={selectedMethod}
            onClose={() => setShowTwoFactorVerification(false)}
            onVerify={handleTwoFactorVerification}
          />
        )}
      </div>

      <LandingFooter />
    </div>
  );
}