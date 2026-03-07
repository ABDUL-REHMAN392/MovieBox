import { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaSignOutAlt, FaTrash, FaEdit, FaCheck, FaTimes, FaHeart } from 'react-icons/fa';
import { IoFilm, IoTv } from 'react-icons/io5';
import { FiAlertTriangle, FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';
import api from '../api/axios';
import { fetchUserProfile, logoutUser, logout, setCredentials } from '../redux/authSlice';
import { resetFavorites } from '../redux/favoritesSlice';

const hasRealProfilePic = (profilePicture) => {
  const url = profilePicture?.url || profilePicture;
  if (!url) return false;
  if (url.includes('gravatar.com')) return false;
  if (url.includes('default-avatar')) return false;
  return true;
};

// ===== INLINE NOTIFICATION HOOK =====
function useNotification() {
  const [notif, setNotif] = useState({ show: false, text: '', type: 'success' });
  const timerRef = useRef(null);

  const show = useCallback((text, type = 'success', duration = 3000) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setNotif({ show: true, text, type });
    timerRef.current = setTimeout(() => setNotif(n => ({ ...n, show: false })), duration);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return { notif, show };
}

// ===== NOTIFICATION BAR =====
function NotificationBar({ notif, darkTheme }) {
  const styles = {
    success: { icon: <FiCheckCircle size={14} />, cls: 'bg-[#29e3ad]/10 border-[#29e3ad]/25 text-[#29e3ad]' },
    error:   { icon: <FiXCircle size={14} />,     cls: 'bg-red-500/10 border-red-500/25 text-red-400' },
    info:    { icon: <FiInfo size={14} />,          cls: darkTheme ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600' },
  };
  const s = styles[notif.type] || styles.info;
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${notif.show ? 'max-h-16 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}
    >
      <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm font-medium ${s.cls}`}>
        {s.icon}
        <span>{notif.text}</span>
      </div>
    </div>
  );
}

// ===== CONFIRM MODAL =====
function ConfirmModal({ open, onCancel, onConfirm, loading, darkTheme, title, description, confirmLabel = 'Confirm', danger = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className={`relative rounded-2xl shadow-2xl p-6 w-full max-w-sm border ${darkTheme ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${danger ? 'bg-red-500/10' : 'bg-[#29e3ad]/10'}`}>
            <FiAlertTriangle className={danger ? 'text-red-400' : 'text-[#29e3ad]'} size={18} />
          </div>
          <h3 className={`font-bold text-base ${darkTheme ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        </div>
        <p className={`text-sm mb-5 leading-relaxed ${darkTheme ? 'text-gray-500' : 'text-gray-400'}`}>{description}</p>
        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer ${darkTheme ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 ${danger ? 'bg-red-500 hover:bg-red-600 text-white' : 'text-black'}`}
            style={!danger ? { background: 'linear-gradient(135deg, #29e3ad, #1ab889)' } : {}}
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : confirmLabel
            }
          </button>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkTheme } = useSelector(state => state.conditions);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { items: favorites } = useSelector(state => state.favorites);
  const fileInputRef = useRef(null);
  const { notif, show: showNotif } = useNotification();

  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [nameValue, setNameValue] = useState(user?.name || '');
  const [emailValue, setEmailValue] = useState(user?.email || '');
  const [savingField, setSavingField] = useState(null);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [deletingPic, setDeletingPic] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showDeletePicConfirm, setShowDeletePicConfirm] = useState(false);
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setNameValue(user?.name || '');
    setEmailValue(user?.email || '');
  }, [user]);

  const profilePicUrl = user?.profilePicture?.url || user?.profilePicture;
  const showPic = hasRealProfilePic(user?.profilePicture);
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';
  const isGoogleUser = user?.authProvider === 'google';
  const movieFavs = favorites.filter(f => f.mediaType === 'movie').length;
  const tvFavs = favorites.filter(f => f.mediaType === 'tv').length;

  const saveName = async () => {
    if (!nameValue.trim() || nameValue.trim() === user?.name) { setEditingName(false); return; }
    setSavingField('name');
    try {
      const res = await api.put('/auth/profile', { name: nameValue.trim() });
      dispatch(setCredentials({ accessToken: localStorage.getItem('accessToken'), user: res.data.user }));
      showNotif('Name updated successfully', 'success');
      setEditingName(false);
    } catch (err) {
      showNotif(err.response?.data?.message || 'Failed to update name', 'error');
    } finally { setSavingField(null); }
  };

  const saveEmail = async () => {
    if (!emailValue.trim() || emailValue.trim() === user?.email) { setEditingEmail(false); return; }
    setSavingField('email');
    try {
      const res = await api.put('/auth/profile', { email: emailValue.trim() });
      dispatch(setCredentials({ accessToken: localStorage.getItem('accessToken'), user: res.data.user }));
      showNotif('Email updated successfully', 'success');
      setEditingEmail(false);
    } catch (err) {
      showNotif(err.response?.data?.message || 'Failed to update email', 'error');
    } finally { setSavingField(null); }
  };

  const handlePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('profilePicture', file);
    setUploadingPic(true);
    try {
      await api.put('/auth/profile-picture', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      await dispatch(fetchUserProfile());
      showNotif('Profile picture updated', 'success');
    } catch (err) {
      showNotif(err.response?.data?.message || 'Failed to upload picture', 'error');
    } finally { setUploadingPic(false); e.target.value = ''; }
  };

  const handleDeletePic = async () => {
    setDeletingPic(true);
    try {
      await api.delete('/auth/profile-picture');
      await dispatch(fetchUserProfile());
      showNotif('Profile picture removed', 'info');
    } catch {
      showNotif('Failed to remove picture', 'error');
    } finally { setDeletingPic(false); setShowDeletePicConfirm(false); }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await dispatch(logoutUser());
    dispatch(resetFavorites());
    setLoggingOut(false);
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    try {
      await api.delete('/auth/account');
      localStorage.removeItem('accessToken');
      dispatch(logout());
      dispatch(resetFavorites());
      navigate('/', { replace: true });
    } catch (err) {
      showNotif(err.response?.data?.message || 'Failed to delete account', 'error');
      setDeletingAccount(false);
      setShowDeleteAccountConfirm(false);
    }
  };

  // Theme
  const bg = darkTheme ? 'bg-[#080808]' : 'bg-[#f5f5f5]';
  const cardBg = darkTheme ? 'bg-[#111] border-white/8' : 'bg-white border-gray-200';
  const text = darkTheme ? 'text-white' : 'text-gray-900';
  const subtext = darkTheme ? 'text-gray-500' : 'text-gray-400';
  const labelText = darkTheme ? 'text-gray-600' : 'text-gray-400';
  const divider = darkTheme ? 'border-white/6' : 'border-gray-100';
  const inputClass = `w-full bg-transparent border-b-2 border-[#29e3ad] outline-none py-1 text-sm ${text}`;
  const rowHover = darkTheme ? 'hover:bg-white/5' : 'hover:bg-gray-50';
  const spinnerEl = <div className="w-3.5 h-3.5 border-2 border-[#29e3ad]/30 border-t-[#29e3ad] rounded-full animate-spin" />;

  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 ${bg}`}>

      {/* Modals */}
      <ConfirmModal
        open={showDeletePicConfirm} darkTheme={darkTheme}
        title="Remove profile picture?"
        description="Your profile picture will be permanently removed."
        confirmLabel="Remove" danger
        loading={deletingPic}
        onCancel={() => setShowDeletePicConfirm(false)}
        onConfirm={handleDeletePic}
      />
      <ConfirmModal
        open={showLogoutConfirm} darkTheme={darkTheme}
        title="Log out?"
        description="You'll need to log in again to access your account."
        confirmLabel="Log out" danger={false}
        loading={loggingOut}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
      <ConfirmModal
        open={showDeleteAccountConfirm} darkTheme={darkTheme}
        title="Delete account?"
        description="This will permanently delete your account and all saved favorites. This action cannot be undone."
        confirmLabel="Delete Account" danger
        loading={deletingAccount}
        onCancel={() => setShowDeleteAccountConfirm(false)}
        onConfirm={handleDeleteAccount}
      />

      <div className="max-w-md mx-auto mt-4">

        {/* Notification */}
        <NotificationBar notif={notif} darkTheme={darkTheme} />

        {/* ===== PROFILE CARD ===== */}
        <div className={`rounded-2xl border overflow-hidden mb-4 ${cardBg}`}>
          <div className="h-[3px] bg-gradient-to-r from-[#29e3ad] via-[#29e3ad]/50 to-transparent" />
          <div className="p-5">

            {/* Avatar + info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative group flex-shrink-0">
                {showPic ? (
                  <img src={profilePicUrl} alt="Profile"
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-[#29e3ad]/50" />
                ) : (
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-black font-bold text-2xl ring-2 ring-[#29e3ad]/30"
                    style={{ background: 'linear-gradient(135deg, #29e3ad, #1ab889)' }}>
                    {userInitial}
                  </div>
                )}
                {uploadingPic ? (
                  <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-[#29e3ad] rounded-full animate-spin" />
                  </div>
                ) : (
                  <div onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                    <FaCamera className="text-white text-sm" />
                  </div>
                )}
                <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handlePicUpload} />
              </div>

              <div className="min-w-0 flex-1">
                <p className={`font-bold text-base truncate ${text}`}>{user?.name || 'User'}</p>
                <p className={`text-xs truncate mb-2 ${subtext}`}>{user?.email}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  isGoogleUser ? 'bg-blue-500/15 text-blue-400' : darkTheme ? 'bg-white/8 text-gray-400' : 'bg-gray-100 text-gray-500'
                }`}>
                  {isGoogleUser ? '🔗 Google' : '📧 Email'}
                </span>
              </div>
            </div>

            {/* Remove pic */}
            {showPic && !isGoogleUser && (
              <button
                onClick={() => setShowDeletePicConfirm(true)}
                disabled={deletingPic}
                className="text-[11px] text-red-400/70 hover:text-red-400 transition-all cursor-pointer disabled:opacity-50 mb-3 block"
              >
                ✕ Remove picture
              </button>
            )}

            {/* Favorites stats */}
            {favorites.length > 0 && (
              <div className={`flex items-center gap-4 pt-3 border-t ${divider}`}>
                <div className="flex items-center gap-1.5">
                  <FaHeart size={11} className="text-[#29e3ad]" />
                  <span className={`text-xs ${subtext}`}>{favorites.length} favorites</span>
                </div>
                {movieFavs > 0 && (
                  <div className="flex items-center gap-1.5">
                    <IoFilm size={12} className="text-blue-400" />
                    <span className={`text-xs ${subtext}`}>{movieFavs} movies</span>
                  </div>
                )}
                {tvFavs > 0 && (
                  <div className="flex items-center gap-1.5">
                    <IoTv size={12} className="text-purple-400" />
                    <span className={`text-xs ${subtext}`}>{tvFavs} shows</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ===== EDITABLE INFO CARD ===== */}
        <div className={`rounded-2xl border overflow-hidden mb-4 ${cardBg}`}>
          <div className={`divide-y ${divider}`}>

            {/* Name */}
            <div className="px-5 py-4">
              <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 ${labelText}`}>Name</p>
              <div className="flex items-center gap-2">
                {editingName ? (
                  <>
                    <input className={inputClass} value={nameValue}
                      onChange={e => setNameValue(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveName()} autoFocus />
                    <button onClick={saveName} disabled={savingField === 'name'} className="text-[#29e3ad] cursor-pointer">
                      {savingField === 'name' ? spinnerEl : <FaCheck size={12} />}
                    </button>
                    <button onClick={() => { setEditingName(false); setNameValue(user?.name || ''); }}
                      className={`cursor-pointer ${subtext} hover:text-red-400`}>
                      <FaTimes size={12} />
                    </button>
                  </>
                ) : (
                  <>
                    <p className={`flex-1 text-sm ${text}`}>{user?.name || '—'}</p>
                    <button onClick={() => setEditingName(true)} className={`cursor-pointer ${subtext} hover:text-[#29e3ad] transition-all`}>
                      <FaEdit size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="px-5 py-4">
              <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 ${labelText}`}>Email</p>
              <div className="flex items-center gap-2">
                {editingEmail && !isGoogleUser ? (
                  <>
                    <input className={inputClass} value={emailValue}
                      onChange={e => setEmailValue(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveEmail()} autoFocus />
                    <button onClick={saveEmail} disabled={savingField === 'email'} className="text-[#29e3ad] cursor-pointer">
                      {savingField === 'email' ? spinnerEl : <FaCheck size={12} />}
                    </button>
                    <button onClick={() => { setEditingEmail(false); setEmailValue(user?.email || ''); }}
                      className={`cursor-pointer ${subtext} hover:text-red-400`}>
                      <FaTimes size={12} />
                    </button>
                  </>
                ) : (
                  <>
                    <p className={`flex-1 text-sm ${text}`}>{user?.email || '—'}</p>
                    {!isGoogleUser && (
                      <button onClick={() => setEditingEmail(true)} className={`cursor-pointer ${subtext} hover:text-[#29e3ad] transition-all`}>
                        <FaEdit size={12} />
                      </button>
                    )}
                  </>
                )}
              </div>
              {isGoogleUser && <p className={`text-[10px] mt-1 ${labelText}`}>Email cannot be changed for Google accounts</p>}
            </div>

            {/* Member since */}
            <div className="px-5 py-4">
              <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 ${labelText}`}>Member Since</p>
              <p className={`text-sm ${text}`}>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : '—'}
              </p>
            </div>
          </div>
        </div>

        {/* ===== ACTIONS CARD ===== */}
        <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-all cursor-pointer ${text} ${rowHover}`}
          >
            <FaSignOutAlt size={13} className={subtext} />
            Logout
          </button>

          <div className={`border-t ${divider}`} />

          <button
            onClick={() => setShowDeleteAccountConfirm(true)}
            disabled={deletingAccount}
            className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-400 hover:bg-red-500/8 transition-all cursor-pointer disabled:opacity-50"
          >
            <FaTrash size={12} />
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;