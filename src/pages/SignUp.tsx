import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const success = signup(email, password);
    if (success) {
      navigate('/profile');
    } else {
      setError('Email already exists');
    }
  };

  return (
    <div className="container-section flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/pears-logo.png" alt="PEARS" className="h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gradient">Create Account</h1>
          <p className="text-gray-400 mt-2">Join the World's #1 Pushbike Ranking System</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg flex items-center gap-2 text-red-500">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Enter Your Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-300 border border-dark-100 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-accent-primary focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Create Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-300 border border-dark-100 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-dark-300 border border-dark-100 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 btn-primary py-3">
              Create Account
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="flex-1 bg-dark-200 text-white font-bold py-3 px-6 rounded-lg hover:bg-dark-300 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;