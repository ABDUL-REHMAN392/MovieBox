import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { CiDark } from "react-icons/ci";
import { IoSunnyOutline, IoMenuOutline } from "react-icons/io5";
import { FaHeart, FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { toggleTheme, displayMenu, showLogin, showSignup, hideLogin, hideSignup } from '../redux/conditionSlice';
import { logoutUser } from '../redux/authSlice';
import { resetFavorites } from '../redux/favoritesSlice';
import ShowMenu from './ShowMenu';
import LoginInterface from './LoginInterface';
import SignupInterface from './SignupInterface';
import Form from './Form';
import { motion, AnimatePresence } from 'framer-motion';

const hasRealProfilePic = (profilePicture) => {
  const url = profilePicture?.url || profilePicture;
  if (!url) return false;
  if (url.includes('gravatar.com')) return false;
  if (url.includes('default-avatar')) return false;
  return true;
};

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  const { darkTheme, Menu, showLogin: loginVisible, showSignup: signupVisible } = useSelector(state => state.conditions);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items: favorites } = useSelector(state => state.favorites);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (loginVisible || signupVisible) ? 'hidden' : 'auto';
  }, [loginVisible, signupVisible]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    setDropdownOpen(false);
    await dispatch(logoutUser());
    dispatch(resetFavorites());
    setLoggingOut(false);
    navigate('/');
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';
  const profilePicUrl = user?.profilePicture?.url || user?.profilePicture;
  const showPic = hasRealProfilePic(user?.profilePicture);

  const headerBg = darkTheme
    ? `bg-black/90 border-white/6 ${scrolled ? 'shadow-lg shadow-black/40' : ''}`
    : `bg-white/90 border-gray-200 ${scrolled ? 'shadow-sm' : ''}`;
  const text = darkTheme ? 'text-white' : 'text-gray-900';
  const subtext = darkTheme ? 'text-gray-500' : 'text-gray-400';
  const dropdownBg = darkTheme ? 'bg-[#0d0d0d] border-white/8' : 'bg-white border-gray-200';
  const rowHover = darkTheme ? 'hover:bg-white/5 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900';
  const themeToggle = darkTheme
    ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-400 hover:text-white'
    : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-500 hover:text-gray-800';

  return (
    <>
      <div className={`w-full fixed top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${headerBg}`}>
        <div className="flex items-center justify-between px-4 md:px-6 py-3 gap-3">

          {/* Logo */}
          <NavLink to='/' className="flex items-center gap-2 flex-shrink-0">
            <img src='https://movies-app-two-rouge.vercel.app/favicon.svg' alt="logo" className="w-7 h-7" />
            <span className={`font-bold text-lg tracking-tight hidden sm:block ${text}`}>Movies</span>
          </NavLink>

          {/* Search */}
          <div className="flex-1 flex justify-center">
            <Form darkTheme={darkTheme} />
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">

            {/* Theme toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${themeToggle}`}
            >
              {darkTheme ? <IoSunnyOutline size={16} /> : <CiDark size={17} />}
            </button>

            {/* Mobile hamburger */}
            <button
              className="flex md:hidden w-8 h-8 rounded-lg items-center justify-center cursor-pointer"
              onClick={() => dispatch(displayMenu())}
            >
              <IoMenuOutline size={22} className={text} />
            </button>

            {Menu && <ShowMenu />}

            {/* Desktop auth */}
            {isAuthenticated ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                    darkTheme ? 'hover:bg-white/6' : 'hover:bg-gray-100'
                  }`}
                >
                  {showPic ? (
                    <img src={profilePicUrl} alt="Profile"
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-[#29e3ad]/50" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#29e3ad] flex items-center justify-center text-black font-bold text-xs">
                      {userInitial}
                    </div>
                  )}
                  <span className={`text-sm font-medium max-w-[80px] truncate ${text}`}>
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <FaChevronDown size={10} className={`transition-transform duration-200 ${subtext} ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: 'easeOut' } }}
                      exit={{ opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.1 } }}
                      className={`absolute right-0 top-11 w-52 rounded-2xl border shadow-2xl overflow-hidden z-50 ${dropdownBg}`}
                    >
                      {/* User info */}
                      <div className={`px-4 py-3 border-b ${darkTheme ? 'border-white/6' : 'border-gray-100'}`}>
                        <div className="flex items-center gap-2.5">
                          {showPic ? (
                            <img src={profilePicUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-[#29e3ad]/40" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#29e3ad] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                              {userInitial}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className={`text-xs font-semibold truncate ${text}`}>{user?.name || 'User'}</p>
                            <p className={`text-[10px] truncate ${subtext}`}>{user?.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="py-1">
                        <button onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-all cursor-pointer ${rowHover}`}>
                          <FaUser size={12} />
                          My Profile
                        </button>

                        <button onClick={() => { setDropdownOpen(false); navigate('/favorites'); }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-all cursor-pointer ${rowHover}`}>
                          <FaHeart size={12} className="text-red-400" />
                          My Favorites
                          {favorites.length > 0 && (
                            <span className="ml-auto text-[9px] bg-[#29e3ad] text-black font-bold px-1.5 py-0.5 rounded-full">
                              {favorites.length}
                            </span>
                          )}
                        </button>
                      </div>

                      <div className={`border-t ${darkTheme ? 'border-white/6' : 'border-gray-100'}`} />

                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          disabled={loggingOut}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/8 transition-all cursor-pointer disabled:opacity-60"
                        >
                          {loggingOut ? (
                            <>
                              <div className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                              Logging out...
                            </>
                          ) : (
                            <>
                              <FaSignOutAlt size={12} />
                              Logout
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1.5">
                <button
                  onClick={() => dispatch(showLogin())}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer border ${
                    darkTheme ? 'border-white/10 text-gray-300 hover:bg-white/6' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => dispatch(showSignup())}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    darkTheme ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-700'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {loginVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex justify-center items-center px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
              exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.15 } }}
            >
              <LoginInterface onClose={() => dispatch(hideLogin())} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {signupVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex justify-center items-center px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
              exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.15 } }}
            >
              <SignupInterface onClose={() => dispatch(hideSignup())} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;