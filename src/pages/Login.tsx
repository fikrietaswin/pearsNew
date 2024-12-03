import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (success) {
      // Check if the user is admin and redirect accordingly
      if (email === 'admin@nht.dev') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container-section flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/pears-logo.png" alt="PEARS" className="h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gradient">Login</h1>
          <p className="text-gray-400 mt-2">Enter the Rider Username or email and password</p>
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
              Enter Your Password Rider
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-300 border border-dark-100 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                placeholder="Enter your password"
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

          <div className="flex gap-4">
            <button type="submit" className="flex-1 btn-primary py-3">
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="flex-1 bg-dark-200 text-white font-bold py-3 px-6 rounded-lg hover:bg-dark-300 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;