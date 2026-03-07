import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { hideMenu, showLogin, showSignup } from "../redux/conditionSlice";
import { logoutUser } from "../redux/authSlice";
import { resetFavorites } from "../redux/favoritesSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoHomeOutline, IoTrendingUpOutline, IoTimeOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const hasRealProfilePic = (profilePicture) => {
  const url = profilePicture?.url || profilePicture;
  if (!url) return false;
  if (url.includes('gravatar.com')) return false;
  if (url.includes('default-avatar')) return false;
  return true;
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.15 } },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", damping: 28, stiffness: 260 } },
  exit: { x: "100%", transition: { type: "tween", duration: 0.25, ease: "easeIn" } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 22, stiffness: 220 } },
};

function ShowMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Menu, darkTheme } = useSelector((state) => state.conditions);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items: favoriteItems } = useSelector((state) => state.favorites);

  const [localMenu, setLocalMenu] = useState(true);

  // Background scroll lock
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = "";
    };
  }, []);

  const closeMenu = () => {
    setLocalMenu(false);
    setTimeout(() => dispatch(hideMenu()), 300);
  };

  const handleNavigate = (path) => {
    setLocalMenu(false);
    setTimeout(() => { dispatch(hideMenu()); navigate(path); }, 300);
  };

  const handleLogout = () => {
    setLocalMenu(false);
    setTimeout(async () => {
      dispatch(hideMenu());
      await dispatch(logoutUser());
      dispatch(resetFavorites());
      toast.success("Logged out successfully!");
      navigate("/");
    }, 300);
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U";
  const profilePicUrl = user?.profilePicture?.url || user?.profilePicture;
  const showPic = hasRealProfilePic(user?.profilePicture);

  // Theme tokens
  const bg = darkTheme ? "bg-[#0d0d0d]" : "bg-white";
  const borderColor = darkTheme ? "border-white/10" : "border-gray-200";
  const text = darkTheme ? "text-white" : "text-gray-900";
  const subtext = darkTheme ? "text-gray-500" : "text-gray-400";
  const divider = darkTheme ? "bg-white/8" : "bg-gray-200";
  const rowHover = darkTheme ? "hover:bg-white/6" : "hover:bg-gray-100";
  const pillBg = darkTheme ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200";
  const accentBtn = darkTheme ? "bg-white text-black hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-700";
  const outlineBtn = darkTheme ? "border border-white/15 text-white hover:bg-white/8" : "border border-gray-300 text-gray-800 hover:bg-gray-50";

  return (
    <AnimatePresence>
      {localMenu && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px]"
            onClick={closeMenu}
          />

          {/* Drawer — fixed, right side, full height */}
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 right-0 h-[100dvh] w-[72vw] max-w-[300px] z-[70] flex flex-col ${bg} shadow-2xl overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent bar */}
            <div className="h-[3px] flex-shrink-0 bg-gradient-to-r from-[#29e3ad] via-[#29e3ad]/50 to-transparent" />

            {/* Header */}
            <div className={`flex-shrink-0 flex items-center justify-between px-4 py-3.5 border-b ${borderColor}`}>
              <div className="flex items-center gap-2">
                <img src="https://movies-app-two-rouge.vercel.app/favicon.svg" alt="Logo" className="w-6 h-6" />
                <span className={`font-bold text-base tracking-tight ${text}`}>Movies</span>
              </div>
              <button
                onClick={closeMenu}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  darkTheme ? "hover:bg-white/10 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-800"
                }`}
              >
                <RxCross1 size={13} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-0.5"
              >

                {/* User card (logged in) */}
                {isAuthenticated && (
                  <motion.div variants={itemVariants} className={`rounded-xl p-3 mb-3 border ${pillBg}`}>
                    <div className="flex items-center gap-2.5">
                      {showPic ? (
                        <img src={profilePicUrl} alt="Profile"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-[#29e3ad]/50 flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#29e3ad] flex items-center justify-center text-black font-bold text-sm ring-2 ring-[#29e3ad]/30">
                          {userInitial}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${text}`}>{user?.name || "User"}</p>
                        <p className={`text-[11px] truncate ${subtext}`}>{user?.email}</p>
                      </div>
                    </div>
                    {favoriteItems.length > 0 && (
                      <div className={`mt-2 flex items-center gap-1.5 text-[11px] ${subtext}`}>
                        <FaHeart size={8} className="text-[#29e3ad]" />
                        <span>{favoriteItems.length} saved</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Section label */}
                <motion.div variants={itemVariants}>
                  <p className={`text-[9px] uppercase tracking-widest font-semibold px-2 mb-1.5 ${subtext}`}>Browse</p>
                </motion.div>

                {/* Nav links */}
                {[
                  { label: "Home", icon: <IoHomeOutline size={15} />, onClick: () => handleNavigate("/") },
                  { label: "Trending", icon: <IoTrendingUpOutline size={15} />, href: "#TrendingMovies" },
                  { label: "Upcoming", icon: <IoTimeOutline size={15} />, href: "#UpcomingMovies" },
                ].map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    {item.href ? (
                      <a href={item.href} onClick={closeMenu}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${text} ${rowHover}`}>
                        <span className="text-[#29e3ad]">{item.icon}</span>
                        {item.label}
                      </a>
                    ) : (
                      <button onClick={item.onClick}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${text} ${rowHover}`}>
                        <span className="text-[#29e3ad]">{item.icon}</span>
                        {item.label}
                      </button>
                    )}
                  </motion.div>
                ))}

                {/* Divider */}
                <motion.div variants={itemVariants} className={`h-px my-3 ${divider}`} />

                {/* Auth section */}
                {isAuthenticated ? (
                  <>
                    <motion.div variants={itemVariants}>
                      <p className={`text-[9px] uppercase tracking-widest font-semibold px-2 mb-1.5 ${subtext}`}>Account</p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button onClick={() => handleNavigate("/profile")}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${text} ${rowHover}`}>
                        <FaUser size={13} className={subtext} />
                        My Profile
                      </button>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button onClick={() => handleNavigate("/favorites")}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${text} ${rowHover}`}>
                        <FaHeart size={13} className="text-red-400" />
                        My Favorites
                        {favoriteItems.length > 0 && (
                          <span className="ml-auto text-[10px] bg-[#29e3ad] text-black font-bold px-1.5 py-0.5 rounded-full leading-none">
                            {favoriteItems.length}
                          </span>
                        )}
                      </button>
                    </motion.div>

                    <motion.div variants={itemVariants} className={`h-px my-3 ${divider}`} />

                    <motion.div variants={itemVariants}>
                      <button onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 transition-all cursor-pointer hover:bg-red-500/10`}>
                        <FaSignOutAlt size={13} />
                        Logout
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div variants={itemVariants}>
                      <p className={`text-[9px] uppercase tracking-widest font-semibold px-2 mb-3 ${subtext}`}>Get Started</p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button
                        onClick={() => { setLocalMenu(false); setTimeout(() => { dispatch(hideMenu()); dispatch(showLogin()); }, 300); }}
                        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer mb-2 ${accentBtn}`}
                      >
                        Login
                      </button>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button
                        onClick={() => { setLocalMenu(false); setTimeout(() => { dispatch(hideMenu()); dispatch(showSignup()); }, 300); }}
                        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${outlineBtn}`}
                      >
                        Create Account
                      </button>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Footer */}
            <div className={`flex-shrink-0 px-4 py-3 border-t ${borderColor}`}>
              <p className={`text-[10px] text-center ${subtext}`}>© 2025 Movies App</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ShowMenu;