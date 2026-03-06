import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function NotFound() {
  const navigate = useNavigate();
  const { darkTheme } = useSelector(state => state.conditions);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${
        darkTheme ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkTheme
            ? 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(41,227,173,0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(41,227,173,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Film strip decorations — left */}
      <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-center gap-3 opacity-10 pl-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className={`w-6 h-4 rounded-sm ${darkTheme ? 'bg-white' : 'bg-gray-800'}`} />
        ))}
      </div>

      {/* Film strip decorations — right */}
      <div className="absolute right-0 top-0 bottom-0 w-10 flex flex-col justify-center gap-3 opacity-10 pr-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className={`w-6 h-4 rounded-sm ${darkTheme ? 'bg-white' : 'bg-gray-800'}`} />
        ))}
      </div>

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* 404 number with cinematic styling */}
        <div className="relative mb-6">
          <span
            className="text-[10rem] sm:text-[14rem] font-black leading-none select-none"
            style={{
              background: darkTheme
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
                : 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 50%, #e5e7eb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.05em',
            }}
          >
            404
          </span>
          {/* Accent overlay on "0" */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ letterSpacing: '-0.05em' }}
          >
            <span
              className="text-[10rem] sm:text-[14rem] font-black leading-none"
              style={{
                background: 'linear-gradient(135deg, #29e3ad 0%, #1ab889 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                clipPath: 'inset(0 40% 0 33%)', // only the "0" in center
              }}
            >
              404
            </span>
          </div>
        </div>

        {/* Icon — film reel */}
        <div
          className="w-16 h-16 rounded-full border-2 border-[#29e3ad]/30 flex items-center justify-center mb-6 relative"
          style={{ boxShadow: '0 0 40px rgba(41,227,173,0.12)' }}
        >
          <span className="text-2xl">🎬</span>
          {/* Spinning ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#29e3ad]/60 animate-spin"
            style={{ animationDuration: '3s' }}
          />
        </div>

        {/* Heading */}
        <h1 className={`text-2xl sm:text-3xl font-bold mb-3 ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
          Scene Not Found
        </h1>

        {/* Subtitle */}
        <p className={`text-sm sm:text-base max-w-sm leading-relaxed mb-8 ${darkTheme ? 'text-gray-500' : 'text-gray-400'}`}>
          Looks like this page went missing from the reel. The content you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #29e3ad 0%, #1ab889 100%)',
              color: '#000',
              boxShadow: '0 4px 20px rgba(41,227,173,0.25)',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 24px rgba(41,227,173,0.35)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(41,227,173,0.25)'; }}
          >
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
              darkTheme
                ? 'border-white/10 text-gray-300 hover:bg-white/5'
                : 'border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Go Back
          </button>
        </div>

        {/* Decorative separator */}
        <div className="flex items-center gap-3 mt-12 opacity-30">
          <div className={`w-12 h-px ${darkTheme ? 'bg-white' : 'bg-gray-400'}`} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#29e3ad]" />
          <div className={`w-12 h-px ${darkTheme ? 'bg-white' : 'bg-gray-400'}`} />
        </div>

        <p className={`text-[11px] mt-4 ${darkTheme ? 'text-gray-700' : 'text-gray-300'}`}>
          Error 404 · Page Not Found
        </p>
      </div>
    </div>
  );
}

export default NotFound;