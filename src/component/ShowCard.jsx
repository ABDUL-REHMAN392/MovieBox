import { NavLink } from 'react-router-dom';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addFavorite, removeFavorite, selectIsFavorited, selectItemLoading } from '../redux/favoritesSlice';
import { showLogin } from '../redux/conditionSlice';

function ShowCard({ image, title, rating, releaseYear, fullData, type = "movie" }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const tmdbId = fullData?.id;
  const mediaType = type;

  const isFavorite = useSelector(selectIsFavorited(tmdbId, mediaType));
  const isLoading = useSelector(selectItemLoading(tmdbId, mediaType));

  // Inline tooltip state
  const [tooltip, setTooltip] = useState({ show: false, text: '', type: 'info' });

  const imgUrl = image || "https://via.placeholder.com/500x750?text=No+Image";

  const showTooltip = (text, type = 'info') => {
    setTooltip({ show: true, text, type });
    setTimeout(() => setTooltip({ show: false, text: '', type: 'info' }), 2000);
  };

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      showTooltip('Login to save favorites', 'warning');
      dispatch(showLogin());
      return;
    }

    if (isLoading) return;

    if (isFavorite) {
      const result = await dispatch(removeFavorite({ tmdbId, mediaType }));
      if (removeFavorite.fulfilled.match(result)) {
        showTooltip('Removed from favorites', 'removed');
      } else {
        showTooltip('Failed. Try again!', 'error');
      }
    } else {
      const result = await dispatch(addFavorite({ tmdbId, mediaType }));
      if (addFavorite.fulfilled.match(result)) {
        showTooltip('Added to favorites!', 'success');
      } else {
        showTooltip('Failed. Try again!', 'error');
      }
    }
  };

  // Tooltip color based on type
  const tooltipColors = {
    success: 'bg-[#29e3ad] text-black',
    removed: 'bg-gray-700 text-white',
    warning: 'bg-yellow-500 text-black',
    error: 'bg-red-500 text-white',
    info: 'bg-gray-800 text-white',
  };

  return (
    <NavLink
      to={`/${type}/${fullData?.id}`}
      className="relative bg-[#141414] cursor-pointer rounded-xl overflow-hidden shadow-lg hover:scale-[1.05] hover:shadow-xl transition-all duration-300 min-w-[170px] max-w-[170px] group"
    >
      {/* Release Year Tag */}
      <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded z-10">
        {releaseYear || "N/A"}
      </div>

      {/* Favorite Button with Inline Tooltip */}
      <div className="absolute top-2 right-2 z-20 flex flex-col items-end gap-1">
        {/* Tooltip bubble */}
        {tooltip.show && (
          <div className={`text-[10px] font-semibold px-2 py-1 rounded-lg shadow-lg whitespace-nowrap ${tooltipColors[tooltip.type]} animate-[fadeIn_0.15s_ease]`}
            style={{ animation: 'fadeInUp 0.15s ease' }}
          >
            {tooltip.text}
          </div>
        )}

        <button
          onClick={toggleFavorite}
          disabled={isLoading}
          className="p-1.5 bg-black/50 hover:bg-black/80 rounded-full text-white transition-all group-hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-[18px] h-[18px] border-2 border-white/30 border-t-[#29e3ad] rounded-full animate-spin" />
          ) : isFavorite ? (
            <IoHeart className="text-[#29e3ad] text-lg" />
          ) : (
            <IoHeartOutline className="text-white text-lg hover:text-[#29e3ad]" />
          )}
        </button>
      </div>

      <img src={imgUrl} alt={title} className="w-full h-[250px] object-cover" />

      <div className="p-2 flex flex-col gap-1 bg-[#1f1f1f]">
        <div className="text-white text-xs font-medium truncate" title={title}>
          {title}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[#29e3ad] text-[11px] font-bold flex items-center gap-1">
            <span>⭐</span>
            <span>{rating || "0"}</span>
          </div>
          <span className="text-gray-400 text-[10px] uppercase font-semibold">{type}</span>
        </div>
      </div>
    </NavLink>
  );
}

export default ShowCard;