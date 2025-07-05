import { useSelector } from 'react-redux';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Footer() {
  const { darkTheme } = useSelector(state => state.conditions);

  return (
    <footer className={`${darkTheme ? 'bg-black text-gray-300' : 'bg-white text-gray-700'} border-t ${darkTheme ? 'border-gray-800' : 'border-gray-200'} py-8 px-6`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo & Brand */}
        <NavLink to='/' className="flex items-center gap-2">
          <img src="https://movies-app-two-rouge.vercel.app/favicon.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold">Movies</span>
        </NavLink>

        {/* Links */}
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="#" className="hover:text-[#29e3ad] transition">Home</a>
          <a href="#" className="hover:text-[#29e3ad] transition">Movies</a>
          <a href="#" className="hover:text-[#29e3ad] transition">TV Shows</a>
          <a href="#" className="hover:text-[#29e3ad] transition">Search</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#29e3ad] transition">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#29e3ad] transition">
            <FaLinkedin size={20} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#29e3ad] transition">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-xs text-center mt-6 opacity-70">
        © {new Date().getFullYear()} Movies App. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
