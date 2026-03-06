import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

const genreMap = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
  80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
  14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
  9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
};

const MIN_LOADING_MS = 800; // ← minimum skeleton display time

function Carousel() {
  const [data, setData] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true); // ← controls skeleton visibility
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const { darkTheme } = useSelector(state => state.conditions);

  useEffect(() => {
    const startTime = Date.now();

    fetch("https://api.themoviedb.org/3/trending/all/week?language=en-US", options)
      .then(r => r.json())
      .then(json => {
        setData(json.results.slice(0, 5));
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
        // wait remaining time before hiding skeleton
        setTimeout(() => setShowSkeleton(false), remaining);
      })
      .catch(() => setTimeout(() => setShowSkeleton(false), 300));
  }, []);

  useEffect(() => {
    if (!data.length) return;
    const interval = setInterval(() => goTo((currentIdx + 1) % data.length), 5000);
    return () => clearInterval(interval);
  }, [data, currentIdx]);

  useEffect(() => {
    if (!data[currentIdx]) return;
    const item = data[currentIdx];
    fetch(`https://api.themoviedb.org/3/${item.media_type}/${item.id}/videos?language=en-US`, options)
      .then(r => r.json())
      .then(json => {
        const t = json.results?.find(v => v.type === "Trailer" && v.site === "YouTube");
        setTrailerUrl(t ? `https://www.youtube.com/watch?v=${t.key}` : null);
      })
      .catch(() => setTrailerUrl(null));
  }, [currentIdx, data]);

  const goTo = (idx) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => { setCurrentIdx(idx); setTransitioning(false); }, 300);
  };

  const currentItem = data[currentIdx];
  const bgImage = currentItem?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentItem.backdrop_path}` : null;
  const genres = currentItem?.genre_ids?.slice(0, 3).map(id => genreMap[id]).filter(Boolean) || [];

  // ── SKELETON ──────────────────────────────────────────────────────────────
  if (showSkeleton) {
    return (
      <div
        className={`relative w-full h-[520px] overflow-hidden ${
          darkTheme ? 'bg-[#121212]' : 'bg-gray-200'
        } animate-pulse`}
      >
        <div className={`absolute inset-0 ${
          darkTheme
            ? 'bg-gradient-to-r from-black/80 via-black/40 to-transparent'
            : 'bg-gradient-to-r from-gray-300/50 via-transparent to-transparent'
        }`} />

        <div className="absolute inset-0 flex items-end md:items-center px-6 md:px-16 pb-14 md:pb-0">
          <div className="max-w-[580px] w-full space-y-4">

            {/* Media type & Year */}
            <div className="flex items-center gap-2">
              <div className={`h-3 w-20 rounded-full ${darkTheme ? 'bg-white/10' : 'bg-gray-300'}`} />
              <div className={`w-1 h-1 rounded-full ${darkTheme ? 'bg-white/20' : 'bg-gray-300'}`} />
              <div className={`h-3 w-12 rounded-full ${darkTheme ? 'bg-white/10' : 'bg-gray-300'}`} />
            </div>

            {/* Title */}
            <div className="space-y-3">
              <div className={`h-10 w-3/4 md:w-full rounded-xl ${darkTheme ? 'bg-white/10' : 'bg-gray-300'}`} />
              <div className={`h-10 w-1/2 md:w-2/3 rounded-xl ${darkTheme ? 'bg-white/10' : 'bg-gray-300'}`} />
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-6 w-16 rounded-full ${darkTheme ? 'bg-white/10' : 'bg-gray-300'}`} />
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className={`h-4 w-4 rounded-sm ${darkTheme ? 'bg-white/10' : 'bg-gray-300'}`} />
              <div className={`h-4 w-10 rounded-md ${darkTheme ? 'bg-white/10' : 'bg-gray-300'}`} />
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <div className={`h-4 w-[90%] rounded ${darkTheme ? 'bg-white/5' : 'bg-gray-300'}`} />
              <div className={`h-4 w-[70%] rounded ${darkTheme ? 'bg-white/5' : 'bg-gray-300'}`} />
            </div>

            {/* CTA */}
            <div className={`h-11 w-40 rounded-full mt-2 ${darkTheme ? 'bg-white/10' : 'bg-gray-300'}`} />
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${darkTheme ? 'bg-white/10' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
    );
  }

  // ── MAIN CAROUSEL ─────────────────────────────────────────────────────────
  return (
    <div className="relative w-full h-[520px] overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {bgImage && (
          <img src={bgImage} alt="bg"
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[8000ms]" />
        )}
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      {/* Content */}
      <div className={`absolute inset-0 flex items-end md:items-center px-6 md:px-16 pb-14 md:pb-0 transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-[580px] text-white space-y-3">

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#29e3ad]">
              {currentItem?.media_type === 'tv' ? 'TV Series' : 'Movie'}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-[10px] text-white/50 tracking-wider">
              {(currentItem?.release_date || currentItem?.first_air_date || '').slice(0, 4)}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight drop-shadow-lg">
            {currentItem?.title || currentItem?.original_name}
          </h1>

          <div className="flex flex-wrap gap-1.5">
            {genres.map((g, i) => (
              <span key={i} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm text-white/80">
                {g}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-yellow-400">★</span>
            <span className="font-semibold">{currentItem?.vote_average?.toFixed(1)}</span>
            <span className="text-white/40 text-xs">/ 10</span>
          </div>

          <p className="text-sm text-white/70 leading-relaxed line-clamp-2 max-w-[90%]">
            {currentItem?.overview}
          </p>

          <button
            onClick={() => trailerUrl ? window.open(trailerUrl, "_blank") : alert("Trailer not available")}
            className="mt-2 flex items-center gap-2 bg-[#29e3ad] text-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#22d4a0] hover:scale-105 transition-all shadow-lg shadow-[#29e3ad]/20 cursor-pointer"
          >
            <FaPlay size={11} /> Watch Trailer
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === currentIdx ? 'w-6 h-1.5 bg-[#29e3ad]' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;