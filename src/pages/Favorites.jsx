import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFavorites, removeFavorite, clearFavorites, getImageUrl } from '../redux/favoritesSlice';
import { IoHeart, IoTrash, IoFilm, IoTv } from 'react-icons/io5';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkTheme } = useSelector(state => state.conditions);
  const { items, loading, actionLoading } = useSelector(state => state.favorites);

  const [filter, setFilter] = useState('all');
  const [showConfirm, setShowConfirm] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, text: '', type: 'info' });

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const filteredItems = filter === 'all'
    ? items
    : items.filter(item => item.mediaType === filter);

  const movieCount = items.filter(i => i.mediaType === 'movie').length;
  const tvCount = items.filter(i => i.mediaType === 'tv').length;

  const showNotif = (text, type = 'info') => {
    setNotification({ show: true, text, type });
    setTimeout(() => setNotification({ show: false, text: '', type: 'info' }), 2500);
  };

  const handleRemove = async (e, item) => {
    e.stopPropagation();
    const result = await dispatch(removeFavorite({ tmdbId: item.tmdbId, mediaType: item.mediaType }));
    if (removeFavorite.fulfilled.match(result)) {
      showNotif(`"${item.title}" removed`, 'removed');
    } else {
      showNotif('Failed to remove. Try again.', 'error');
    }
  };

  const handleClearAll = async () => {
    setClearLoading(true);
    const result = await dispatch(clearFavorites());
    setClearLoading(false);
    setShowConfirm(false);
    if (clearFavorites.fulfilled.match(result)) {
      setFilter('all');
      showNotif('All favorites cleared', 'removed');
    } else {
      showNotif('Failed to clear. Try again.', 'error');
    }
  };

  const getReleaseYear = (releaseDate) => {
    if (!releaseDate) return 'N/A';
    return new Date(releaseDate).getFullYear();
  };

  const getRatingColor = (rating) => {
    if (rating >= 7) return '#29e3ad';
    if (rating >= 5) return '#facc15';
    return '#f87171';
  };

  // Notification colors
  const notifStyles = {
    removed: darkTheme ? 'bg-[#1a1a1a] border-white/10 text-gray-300' : 'bg-white border-gray-200 text-gray-600',
    error: 'bg-red-500/10 border-red-500/20 text-red-400',
    success: 'bg-[#29e3ad]/10 border-[#29e3ad]/20 text-[#29e3ad]',
    info: darkTheme ? 'bg-[#1a1a1a] border-white/10 text-gray-300' : 'bg-white border-gray-200 text-gray-600',
  };

  return (
    <div className={`min-h-screen pt-20 pb-16 ${darkTheme ? 'bg-[#080808] text-white' : 'bg-[#f5f5f5] text-gray-900'}`}>

      {/* ===== AMBIENT GLOW ===== */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(41,227,173,0.05) 0%, transparent 70%)',
        }}
      />

      {/* ===== INLINE NOTIFICATION ===== */}
      <div
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none"
        style={{
          opacity: notification.show ? 1 : 0,
          transform: notification.show ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-8px)',
        }}
      >
        <div className={`px-4 py-2.5 rounded-xl border text-sm font-medium shadow-xl backdrop-blur-sm whitespace-nowrap ${notifStyles[notification.type]}`}>
          {notification.text}
        </div>
      </div>

      {/* ===== CLEAR ALL CONFIRM MODAL ===== */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div
            className={`relative rounded-2xl shadow-2xl p-6 w-full max-w-sm border ${
              darkTheme ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center">
                <FiAlertTriangle className="text-red-400" size={18} />
              </div>
              <h3 className={`font-bold text-base ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
                Clear all favorites?
              </h3>
            </div>
            <p className={`text-sm mb-5 leading-relaxed ${darkTheme ? 'text-gray-500' : 'text-gray-400'}`}>
              This will permanently remove all {items.length} saved titles. This action cannot be undone.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setShowConfirm(false)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                  darkTheme ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                disabled={clearLoading}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {clearLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <IoTrash size={14} />
                    Clear All
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto mt-4">

        {/* ===== HEADER ===== */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div
                className="w-1 h-6 rounded-full"
                style={{ background: 'linear-gradient(180deg, #29e3ad, #1ab889)', boxShadow: '0 0 10px rgba(41,227,173,0.4)' }}
              />
              <h1 className={`text-2xl font-black tracking-tight ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
                My Favorites
              </h1>
            </div>
            {items.length > 0 && (
              <p className={`text-sm ml-4 ${darkTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                {items.length} title{items.length !== 1 ? 's' : ''} saved
              </p>
            )}
          </div>

          {items.length > 0 && (
            <button
              onClick={() => setShowConfirm(true)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                darkTheme
                  ? 'border-red-500/20 text-red-400/70 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/40'
                  : 'border-red-200 text-red-400 hover:bg-red-50 hover:border-red-300'
              }`}
            >
              <IoTrash size={12} />
              Clear All
            </button>
          )}
        </div>

        {/* ===== FILTER TABS ===== */}
        {items.length > 0 && (
          <div className="flex items-center gap-2 mb-8">
            {[
              { key: 'all', label: 'All', count: items.length },
              { key: 'movie', label: 'Movies', count: movieCount, icon: <IoFilm size={12} /> },
              { key: 'tv', label: 'TV Shows', count: tvCount, icon: <IoTv size={12} /> },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.key
                    ? 'text-black'
                    : darkTheme
                      ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                      : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                }`}
                style={filter === tab.key ? {
                  background: 'linear-gradient(135deg, #29e3ad, #1ab889)',
                  boxShadow: '0 4px 16px rgba(41,227,173,0.25)',
                } : {}}
              >
                {tab.icon}
                {tab.label}
                <span className={`ml-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  filter === tab.key
                    ? 'bg-black/15 text-black/70'
                    : darkTheme ? 'bg-white/10 text-gray-500' : 'bg-gray-100 text-gray-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ===== LOADING ===== */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div
              className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
              style={{ borderTopColor: '#29e3ad', boxShadow: '0 0 20px rgba(41,227,173,0.2)' }}
            />
            <p className={`text-sm ${darkTheme ? 'text-gray-600' : 'text-gray-400'}`}>Loading your favorites...</p>
          </div>
        )}

        {/* ===== EMPTY STATE ===== */}
        {!loading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-5">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center ${darkTheme ? 'bg-white/5' : 'bg-gray-100'}`}
              style={{ boxShadow: '0 0 40px rgba(41,227,173,0.08)' }}
            >
              <MdOutlineFavoriteBorder className="text-4xl text-[#29e3ad]/60" />
            </div>
            <div className="text-center">
              <p className={`text-lg font-bold mb-1 ${darkTheme ? 'text-white' : 'text-gray-800'}`}>
                Nothing saved yet
              </p>
              <p className={`text-sm ${darkTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                Tap the heart on any movie or show to save it here
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-black transition-all cursor-pointer mt-1"
              style={{
                background: 'linear-gradient(135deg, #29e3ad, #1ab889)',
                boxShadow: '0 4px 20px rgba(41,227,173,0.25)',
              }}
            >
              Browse Movies
            </button>
          </div>
        )}

        {/* ===== FILTERED EMPTY ===== */}
        {!loading && items.length > 0 && filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${darkTheme ? 'bg-white/5' : 'bg-gray-100'}`}>
              {filter === 'movie' ? <IoFilm className="text-2xl text-gray-500" /> : <IoTv className="text-2xl text-gray-500" />}
            </div>
            <p className={`text-sm ${darkTheme ? 'text-gray-500' : 'text-gray-400'}`}>
              No {filter === 'movie' ? 'movies' : 'TV shows'} in your favorites yet
            </p>
          </div>
        )}

        {/* ===== FAVORITES GRID ===== */}
        {!loading && filteredItems.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {filteredItems.map((item, index) => {
              const isRemoving = actionLoading[`${item.tmdbId}-${item.mediaType}`];
              const imageUrl = getImageUrl(item.posterPath);
              const releaseYear = getReleaseYear(item.releaseDate);
              const rating = item.voteAverage ? parseFloat(item.voteAverage).toFixed(1) : null;
              const ratingColor = rating ? getRatingColor(parseFloat(rating)) : '#6b7280';

              return (
                <div
                  key={`${item.tmdbId}-${item.mediaType}`}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] ${
                    darkTheme
                      ? 'bg-[#111] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
                      : 'bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-gray-100'
                  }`}
                  style={{
                    animationDelay: `${index * 30}ms`,
                  }}
                  onClick={() => navigate(`/${item.mediaType}/${item.tmdbId}`)}
                >
                  {/* Poster */}
                  <div className="relative overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full h-[220px] sm:h-[240px] object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'; }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Year Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg">
                      {releaseYear}
                    </div>

                    {/* Media Type Badge */}
                    <div
                      className={`absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-lg font-bold backdrop-blur-sm ${
                        item.mediaType === 'movie' ? 'bg-blue-500/75 text-white' : 'bg-violet-500/75 text-white'
                      }`}
                    >
                      {item.mediaType === 'movie' ? <IoFilm size={9} /> : <IoTv size={9} />}
                      {item.mediaType === 'movie' ? 'Movie' : 'TV'}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={(e) => handleRemove(e, item)}
                      disabled={isRemoving}
                      className="absolute top-2.5 right-2.5 p-1.5 bg-black/50 backdrop-blur-sm hover:bg-red-500/90 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 z-10 disabled:opacity-40 cursor-pointer"
                    >
                      {isRemoving
                        ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <IoTrash size={12} />
                      }
                    </button>

                    {/* Rating pill — visible on hover */}
                    {rating && (
                      <div
                        className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: 'rgba(0,0,0,0.7)' }}
                      >
                        <FaStar size={8} style={{ color: ratingColor }} />
                        <span className="text-[10px] font-bold" style={{ color: ratingColor }}>{rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className={`p-3 ${darkTheme ? 'bg-[#111]' : 'bg-white'}`}>
                    {/* Title */}
                    <p
                      className={`text-xs font-bold truncate mb-1.5 ${darkTheme ? 'text-white' : 'text-gray-900'}`}
                      title={item.title}
                    >
                      {item.title}
                    </p>

                    {/* Rating + Genre row */}
                    <div className="flex items-center justify-between gap-1">
                      {rating ? (
                        <div className="flex items-center gap-1">
                          <FaStar size={9} style={{ color: ratingColor }} />
                          <span className="text-[11px] font-bold" style={{ color: ratingColor }}>{rating}</span>
                        </div>
                      ) : (
                        <span className={`text-[10px] ${darkTheme ? 'text-gray-700' : 'text-gray-300'}`}>—</span>
                      )}

                      {item.genres && item.genres.length > 0 && (
                        <span className={`text-[9px] truncate max-w-[70px] font-medium ${darkTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                          {item.genres[0]}
                        </span>
                      )}
                    </div>

                    {/* Overview */}
                    {item.overview && (
                      <p className={`text-[10px] mt-2 line-clamp-2 leading-relaxed ${darkTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                        {item.overview}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;