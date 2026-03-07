// ===== Footer.jsx =====
import { useSelector } from 'react-redux';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export function Footer() {
  const { darkTheme } = useSelector(state => state.conditions);
  const bg = darkTheme ? 'bg-[#080808] border-white/6' : 'bg-white border-gray-100';
  const text = darkTheme ? 'text-gray-500' : 'text-gray-400';

  const navLinks = [
    { label: 'Home', to: '#home' },
    { label: 'Trending Movies', to: '#TrendingMovies' },
    { label: 'Trending TV Shows', to: '#TrendingTVShows' },
    { label: 'Search', to: '/search' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
  ];

  return (
    <footer className={`border-t ${bg} py-8 px-6`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        <NavLink to='/' className="flex items-center gap-2">
          <img src="https://movies-app-two-rouge.vercel.app/favicon.svg" alt="Logo" className="w-7 h-7" />
          <span className={`text-sm font-bold tracking-tight ${darkTheme ? 'text-white' : 'text-gray-900'}`}>Movies</span>
        </NavLink>

        <div className="flex flex-wrap justify-center gap-5 text-xs">
          {navLinks.map(({ label, to }) => (
            <a
              key={label}
              href={to}
              className={`transition-all ${text} hover:text-[#29e3ad]`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex gap-3">
          {[
            { icon: <FaGithub size={16} />, href: "https://github.com/" },
            { icon: <FaLinkedin size={16} />, href: "https://linkedin.com/" },
            { icon: <FaTwitter size={16} />, href: "https://twitter.com/" },
          ].map(({ icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                darkTheme ? 'bg-white/5 text-gray-400 hover:bg-[#29e3ad]/15 hover:text-[#29e3ad]' : 'bg-gray-100 text-gray-400 hover:bg-[#29e3ad]/10 hover:text-[#29e3ad]'
              }`}>
              {icon}
            </a>
          ))}
        </div>
      </div>

      <div className={`text-center mt-6 text-[10px] tracking-wider ${text}`}>
        © {new Date().getFullYear()} MovieBox. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;