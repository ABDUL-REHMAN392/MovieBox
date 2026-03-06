import { useSelector, useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { MdEmail, MdLock } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../redux/authSlice';
import { showSignup, hideLogin } from '../redux/conditionSlice';

function LoginInterface({ onClose }) {
  const dispatch = useDispatch();
  const { darkTheme } = useSelector(state => state.conditions);
  const { loading } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [globalError, setGlobalError] = useState('');

  // Validation logic
  const validate = (field, value) => {
    const errs = {};
    if (field === 'email' || !field) {
      if (!email && field !== 'email') errs.email = 'Email is required';
      else if (field === 'email' && !value) errs.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field === 'email' ? value : email))
        errs.email = 'Enter a valid email address';
    }
    if (field === 'password' || !field) {
      const pw = field === 'password' ? value : password;
      if (!pw) errs.password = 'Password is required';
    }
    return errs;
  };

  const handleBlur = (field) => {
    setTouched(t => ({ ...t, [field]: true }));
    const val = field === 'email' ? email : password;
    const errs = validate(field, val);
    setErrors(prev => ({ ...prev, ...errs, ...(errs[field] ? {} : { [field]: '' }) }));
    if (!errs[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleChange = (field, value) => {
    if (field === 'email') setEmail(value);
    else setPassword(value);
    setGlobalError('');
    if (touched[field]) {
      const errs = validate(field, value);
      setErrors(prev => ({ ...prev, [field]: errs[field] || '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const errs = validate(null);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setGlobalError('');
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      toast.success('Welcome back! 👋');
      onClose();
      setEmail(''); setPassword('');
    } else {
      setGlobalError(result.payload || 'Invalid email or password. Please try again.');
    }
  };

  const handleGoogleAuth = () => {
    const backendUrl = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace('/api', '')
      : 'https://moviebackend-production-d023.up.railway.app';
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  const switchToSignup = () => {
    dispatch(hideLogin());
    dispatch(showSignup());
  };

  const bg = darkTheme ? 'bg-[#0d0d0d]' : 'bg-white';
  const border = darkTheme ? 'border-white/10' : 'border-gray-200';
  const text = darkTheme ? 'text-white' : 'text-gray-900';
  const subtext = darkTheme ? 'text-gray-500' : 'text-gray-400';
  const inputBg = darkTheme
    ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600'
    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400';
  const inputFocus = 'focus:border-[#29e3ad] focus:ring-1 focus:ring-[#29e3ad]/30';
  const dividerColor = darkTheme ? 'bg-white/8' : 'bg-gray-200';
  const googleBtn = darkTheme
    ? 'border-white/10 hover:bg-white/5 text-white'
    : 'border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm';
  const primaryBtn = darkTheme
    ? 'bg-white text-black hover:bg-gray-100'
    : 'bg-gray-900 text-white hover:bg-gray-700';

  const FieldError = ({ field }) =>
    touched[field] && errors[field] ? (
      <div className="flex items-center gap-1.5 mt-1">
        <FiAlertCircle size={11} className="text-red-400 shrink-0" />
        <p className="text-[11px] text-red-400">{errors[field]}</p>
      </div>
    ) : touched[field] && !errors[field] && (field === 'email' ? email : password) ? (
      <div className="flex items-center gap-1.5 mt-1">
        <FiCheckCircle size={11} className="text-[#29e3ad] shrink-0" />
        <p className="text-[11px] text-[#29e3ad]">Looks good</p>
      </div>
    ) : null;

  const inputBorderState = (field) => {
    if (touched[field] && errors[field]) return 'border-red-500 focus:border-red-500 focus:ring-red-500/20';
    if (touched[field] && !errors[field] && (field === 'email' ? email : password))
      return 'border-[#29e3ad] focus:border-[#29e3ad] focus:ring-[#29e3ad]/20';
    return inputFocus;
  };

  return (
    <div className={`relative w-[92vw] sm:w-[400px] rounded-2xl shadow-2xl overflow-hidden ${bg} border ${border}`}>
      <div className="h-[3px] w-full bg-gradient-to-r from-[#29e3ad] via-[#29e3ad]/50 to-transparent" />

      <button
        onClick={onClose}
        className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer z-10 ${
          darkTheme ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-700'
        }`}
      >
        <IoClose size={15} />
      </button>

      <div className="px-6 pt-6 pb-7">
        <div className="flex items-center gap-2 mb-1">
          <img src="https://movies-app-two-rouge.vercel.app/favicon.svg" alt="Logo" className="w-6 h-6" />
          <span className={`text-xs font-semibold tracking-wider uppercase ${subtext}`}>Movies App</span>
        </div>
        <h2 className={`text-xl font-bold mb-1 ${text}`}>Welcome back</h2>
        <p className={`text-sm mb-6 ${subtext}`}>Login to your account</p>

        {/* Global Error Banner */}
        {globalError && (
          <div className="flex items-start gap-2.5 mb-4 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
            <FiAlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-400 leading-relaxed">{globalError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
          {/* Email */}
          <div>
            <div className="relative">
              <MdEmail className={`absolute top-1/2 -translate-y-1/2 left-3 text-sm ${subtext}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="Email address"
                disabled={loading}
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl border outline-none text-sm transition-all disabled:opacity-50 ${inputBg} ${inputBorderState('email')}`}
              />
            </div>
            <FieldError field="email" />
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <MdLock className={`absolute top-1/2 -translate-y-1/2 left-3 text-sm ${subtext}`} />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => handleChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                placeholder="Password"
                disabled={loading}
                className={`w-full pl-9 pr-10 py-2.5 rounded-xl border outline-none text-sm transition-all disabled:opacity-50 ${inputBg} ${inputBorderState('password')}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className={`absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer ${subtext} hover:text-[#29e3ad] transition-all`}
              >
                {showPass ? <FiEyeOff size={14} /> : <FiEye size={14} />}
              </button>
            </div>
            <FieldError field="password" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-1 ${primaryBtn}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                Logging in...
              </span>
            ) : 'Login'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-4">
          <div className={`flex-1 h-px ${dividerColor}`} />
          <span className={`text-[11px] font-semibold ${subtext}`}>OR</span>
          <div className={`flex-1 h-px ${dividerColor}`} />
        </div>

        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer disabled:opacity-50 ${googleBtn}`}
        >
          <FcGoogle size={18} />
          Continue with Google
        </button>

        <p className={`text-center text-xs mt-5 ${subtext}`}>
          Don&apos;t have an account?{' '}
          <button onClick={switchToSignup} className="text-[#29e3ad] font-semibold hover:underline cursor-pointer">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginInterface;