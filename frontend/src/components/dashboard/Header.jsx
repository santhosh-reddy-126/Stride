import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getCurrentDate, getInitials } from '../../utils/helpers';

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <header className="top-header">
      <div className="top-header-left">
        <button className="mobile-menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
          <Menu size={22} />
        </button>
        <span className="header-date">{getCurrentDate()}</span>
      </div>
      <div className="top-header-right">
        <div className="header-profile" ref={dropdownRef}>
          <div
            className="header-profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            onKeyDown={(e) => e.key === 'Enter' && setDropdownOpen(!dropdownOpen)}
          >
            <div className="avatar">{getInitials(user?.name)}</div>
            <span className="profile-name">{user?.name || 'User'}</span>
          </div>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                className="profile-dropdown"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                <div className="profile-dropdown-header">
                  <div className="dropdown-name">{user?.name}</div>
                  <div className="dropdown-email">{user?.email}</div>
                </div>
                <button className="dropdown-item danger" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
