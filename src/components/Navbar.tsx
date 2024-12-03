import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Trophy, Users, Calendar, Newspaper, LogOut, Menu, X, Store, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const NavLinks = () => (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/riders"
          onClick={() => setIsMenuOpen(false)}
          className={`flex items-center space-x-1 hover:text-accent-primary transition-colors ${
            isActive('/riders') ? 'text-accent-primary' : 'text-gray-300'
          }`}
        >
          <Users size={20} />
          <span>Riders</span>
        </Link>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/events"
          onClick={() => setIsMenuOpen(false)}
          className={`flex items-center space-x-1 hover:text-accent-primary transition-colors ${
            isActive('/events') ? 'text-accent-primary' : 'text-gray-300'
          }`}
        >
          <Calendar size={20} />
          <span>Events</span>
        </Link>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/news"
          onClick={() => setIsMenuOpen(false)}
          className={`flex items-center space-x-1 hover:text-accent-primary transition-colors ${
            isActive('/news') ? 'text-accent-primary' : 'text-gray-300'
          }`}
        >
          <Newspaper size={20} />
          <span>News</span>
        </Link>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <a
          href="https://commerce.pears.co.id"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-gray-300 hover:text-accent-primary transition-colors"
        >
          <Store size={20} />
          <span>Store</span>
        </a>
      </motion.div>

      {isAdmin && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/admin"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center space-x-1 hover:text-accent-primary transition-colors ${
              isActive('/admin') ? 'text-accent-primary' : 'text-gray-300'
            }`}
          >
            <Trophy size={20} />
            <span>Admin</span>
          </Link>
        </motion.div>
      )}

      {user ? (
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center space-x-1 hover:text-accent-primary transition-colors ${
                isActive('/profile') ? 'text-accent-primary' : 'text-gray-300'
              }`}
            >
              <UserCircle size={20} />
              <span className="md:hidden">Profile</span>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
                navigate('/');
              }}
              className="flex items-center space-x-1 text-gray-300 hover:text-accent-primary transition-colors"
            >
              <LogOut size={20} />
              <span className="md:hidden">Logout</span>
            </button>
          </motion.div>
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/signup"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center space-x-1 text-gray-300 hover:text-accent-primary transition-colors"
          >
            <Users size={20} />
            <span>Sign Up</span>
          </Link>
        </motion.div>
      )}
    </>
  );
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-effect sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <img src="https://pears.co.id/assets/img/logo-white.svg" alt="PEARS" className="h-8" />
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Mobile Navigation Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-accent-primary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-effect border-t border-dark-100"
          >
            <div className="px-4 py-6 space-y-4">
              <NavLinks />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;