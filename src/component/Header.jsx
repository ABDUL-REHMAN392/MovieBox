import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CiDark } from "react-icons/ci";
import { GrMenu } from "react-icons/gr";
import { IoSunnyOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { toggleTheme, displayMenu, showLogin, showSignup, hideLogin, hideSignup, hideMenu } from '../redux/conditionSlice';
import ShowMenu from './ShowMenu';
import LoginInterface from './LoginInterface';
import SignupInterface from './SignupInterface';
import Form from './Form';

function Header() {
  const dispatch = useDispatch();
  const { darkTheme, Menu, showLogin: loginVisible, showSignup: signupVisible } = useSelector(state => state.conditions);

  useEffect(() => {
    document.body.style.overflow = (loginVisible || signupVisible) ? 'hidden' : 'auto';
  }, [loginVisible, signupVisible]);

  return (
    <>
      <div className={`w-full fixed top-0 z-50 transition-colors backdrop-blur-md ${darkTheme ? 'bg-black' : 'bg-white/80'}`}>
        <div className="flex justify-between items-center py-3 px-4">
          
          {/* Logo */}
          <NavLink to='/' className="flex items-center gap-2 md:ml-4">
            <img src='https://movies-app-two-rouge.vercel.app/favicon.svg' alt="logo" />
            <p className={`font-medium text-2xl ${darkTheme ? 'text-white' : 'text-black'}`}>Movies</p>
          </NavLink>

          {/* Form */}
          <div className="flex-1 flex justify-center mx-4">
            <Form darkTheme={darkTheme} />
          </div>

          {/* Theme Toggle + Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`cursor-pointer transition-all duration-500 ${darkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} border border-gray-700 rounded py-[5.5px] px-[7px]`}
            >
              {darkTheme ? <CiDark size={18} className="text-white" /> : <IoSunnyOutline size={18} className="text-black" />}
            </button>

            {/* Mobile Menu */}
            <div className="block md:hidden" onClick={() => dispatch(displayMenu())}>
              <GrMenu size={23} className={`${darkTheme ? 'text-white' : 'text-black'}`} />
            </div>

            {Menu && <ShowMenu onClose={() => dispatch(hideMenu())} />}

            {/* Sign Up */}
            <button
              onClick={() => dispatch(showSignup())}
              className={`px-4 hidden md:inline py-2 transition-all duration-500 rounded-md cursor-pointer text-sm font-medium ${darkTheme ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-black/70'}`}
            >
              Sign up
            </button>

            {/* Login */}
            <button
              onClick={() => dispatch(showLogin())}
              className={`px-4 hidden md:inline py-2 transition-all duration-500 rounded-md cursor-pointer text-sm font-medium ${darkTheme ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-black/70'}`}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {loginVisible && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center">
          <LoginInterface onClose={() => dispatch(hideLogin())} />
        </div>
      )}

      {/* Signup Modal */}
      {signupVisible && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center">
          <SignupInterface onClose={() => dispatch(hideSignup())} />
        </div>
      )}
    </>
  );
}

export default Header;
