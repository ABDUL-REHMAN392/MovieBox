import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { hideMenu, showLogin, showSignup } from "../redux/conditionSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const menuVariants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.5, ease: "easeOut" },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { type: "tween", duration: 0.5, ease: "easeIn" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

function ShowMenu() {
  const dispatch = useDispatch();
  const { Menu } = useSelector((state) => state.conditions);

  const [localMenu, setLocalMenu] = useState(true);

  useEffect(() => {
    document.body.style.overflow = Menu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [Menu]);

  const handleClose = (e) => {
    e.stopPropagation();
    setLocalMenu(false);
    setTimeout(() => dispatch(hideMenu()), 500);
  };

  return (
    <AnimatePresence mode="wait">
      {localMenu && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          className="fixed inset-0 z-50 min-h-screen w-full bg-black/90 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            className="relative flex flex-col text-white min-h-screen"
            onClick={(e) => e.stopPropagation()}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between px-6 py-4 border-b border-gray-700"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://movies-app-two-rouge.vercel.app/favicon.svg"
                  alt="Logo"
                  className="w-9 h-9"
                />
                <h1 className="text-white text-2xl font-bold">Movie</h1>
              </div>
              <RxCross1
                size={26}
                className="text-white hover:text-[#29e3ad] cursor-pointer"
                onClick={handleClose}
              />
            </motion.div>

            {/* Menu Items */}
            <motion.div
              className="flex-1 flex flex-col justify-center items-center gap-10 text-xl font-medium"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div variants={itemVariants}>
                <NavLink
                  to="/"
                  onClick={handleClose}
                  className="hover:text-[#29e3ad] transition duration-300"
                >
                  Home
                </NavLink>
              </motion.div>

              <motion.div variants={itemVariants}>
                <a
                  href="#TrendingMovies"
                  onClick={handleClose}
                  className="hover:text-[#29e3ad] transition duration-300"
                >
                  Trending
                </a>
              </motion.div>

              <motion.div variants={itemVariants}>
                <a
                  href="#UpcomingMovies"
                  onClick={handleClose}
                  className="hover:text-[#29e3ad] transition duration-300"
                >
                  Upcoming
                </a>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  onClick={() => {
                    setLocalMenu(false);
                    setTimeout(() => {
                      dispatch(hideMenu());
                      dispatch(showLogin());
                    }, 500);
                  }}
                  className="hover:text-[#29e3ad] transition duration-300"
                >
                  Login
                </button>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  onClick={() => {
                    setLocalMenu(false);
                    setTimeout(() => {
                      dispatch(hideMenu());
                      dispatch(showSignup());
                    }, 500);
                  }}
                  className="hover:text-[#29e3ad] transition duration-300"
                >
                  Sign Up
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ShowMenu;
