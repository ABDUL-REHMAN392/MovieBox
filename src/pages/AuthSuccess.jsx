import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, fetchUserProfile } from '../redux/authSlice';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkTheme } = useSelector(state => state.conditions);

  // 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleAuth = async () => {
      const token = searchParams.get('token');
      if (token) {
        try {
          localStorage.setItem('accessToken', token);
          dispatch(setCredentials({ accessToken: token, user: null }));
          const result = await dispatch(fetchUserProfile());
          if (result.type === 'auth/profile/fulfilled') {
            setStatus('success');
            setTimeout(() => navigate('/', { replace: true }), 2000);
          } else {
            throw new Error('Failed to fetch profile');
          }
        } catch {
          setStatus('error');
          setErrorMsg('Authentication completed but failed to load profile.');
          setTimeout(() => navigate('/', { replace: true }), 3000);
        }
      } else {
        setStatus('error');
        setErrorMsg('No authentication token received.');
        setTimeout(() => navigate('/', { replace: true }), 3000);
      }
    };
    handleAuth();
  }, [searchParams, navigate, dispatch]);

  const bg = darkTheme ? 'bg-[#080808]' : 'bg-[#f5f5f5]';
  const cardBg = darkTheme ? 'bg-[#0d0d0d] border-white/8' : 'bg-white border-gray-200';
  const text = darkTheme ? 'text-white' : 'text-gray-900';
  const subtext = darkTheme ? 'text-gray-500' : 'text-gray-400';

  return (
    <div className={`flex items-center justify-center min-h-screen ${bg}`}>
      <div className={`w-[88vw] sm:w-[380px] rounded-2xl border overflow-hidden shadow-2xl ${cardBg}`}>

        {/* Top accent */}
        <div className={`h-[3px] bg-gradient-to-r to-transparent ${
          status === 'error'
            ? 'from-red-500 via-red-400/50'
            : 'from-[#29e3ad] via-[#29e3ad]/50'
        }`} />

        <div className="p-8 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <img src="https://movies-app-two-rouge.vercel.app/favicon.svg" alt="Logo" className="w-6 h-6" />
            <span className={`text-xs font-semibold tracking-widest uppercase ${subtext}`}>Movies App</span>
          </div>

          {/* Status icon */}
          {status === 'loading' && (
            <>
              <div className="relative w-16 h-16 mb-6">
                <div className={`absolute inset-0 rounded-full border-4 ${darkTheme ? 'border-white/5' : 'border-gray-100'}`} />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#29e3ad] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-[#29e3ad]/20 animate-pulse" />
                </div>
              </div>
              <h2 className={`text-lg font-bold mb-1 ${text}`}>Signing you in...</h2>
              <p className={`text-sm mb-6 ${subtext}`}>Setting up your account</p>
              <div className="flex gap-1.5">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#29e3ad] animate-pulse" style={{ animationDelay: `${delay}s` }} />
                ))}
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 rounded-full bg-[#29e3ad]/10 border border-[#29e3ad]/25" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#29e3ad]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className={`text-lg font-bold mb-1 ${text}`}>Welcome back!</h2>
              <p className={`text-sm mb-6 ${subtext}`}>Login successful. Redirecting you now...</p>
              <div className="flex gap-1.5">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#29e3ad] animate-pulse" style={{ animationDelay: `${delay}s` }} />
                ))}
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className={`text-lg font-bold mb-1 ${text}`}>Something went wrong</h2>
              <p className={`text-sm mb-6 ${subtext}`}>{errorMsg}</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-black transition-all cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #29e3ad, #1ab889)' }}
              >
                Go Home
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;