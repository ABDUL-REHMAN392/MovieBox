import { useState, useRef, useEffect, useCallback } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { IoFilm, IoTv } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TMDB_IMAGE = 'https://image.tmdb.org/t/p/w92';

function Form({ darkTheme }) {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [focused, setFocused] = useState(false);

  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIdx(-1);
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchResults = useCallback(async (query) => {
    if (!query.trim()) { setResults([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=1`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      const filtered = (data.results || [])
        .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
        .slice(0, 6);
      setResults(filtered);
      setOpen(true);
      setActiveIdx(-1);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    clearTimeout(debounceRef.current);
    if (!val.trim()) { setResults([]); setOpen(false); setLoading(false); return; }
    setLoading(true);
    debounceRef.current = setTimeout(() => fetchResults(val), 350);
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!input.trim()) return;
    setOpen(false);
    navigate(`/search?query=${input.trim()}`);
    setInput('');
    inputRef.current?.blur();
  };

  const handleSelect = (item) => {
    setOpen(false);
    setInput('');
    navigate(`/${item.media_type}/${item.id}`);
  };

  const handleKeyDown = (e) => {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)); }
    else if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); handleSelect(results[activeIdx]); }
    else if (e.key === 'Escape') { setOpen(false); setActiveIdx(-1); }
  };

  const clear = () => {
    setInput('');
    setResults([]);
    setOpen(false);
    setActiveIdx(-1);
    inputRef.current?.focus();
  };

  const getTitle = (item) => item.title || item.name || 'Unknown';
  const getYear = (item) => {
    const d = item.release_date || item.first_air_date;
    return d ? new Date(d).getFullYear() : null;
  };
  const getPoster = (item) => item.poster_path ? `${TMDB_IMAGE}${item.poster_path}` : null;
  const getRating = (item) => item.vote_average && item.vote_average > 0 ? item.vote_average.toFixed(1) : null;

  const showDropdown = open && (results.length > 0 || loading);

  return (
    <div ref={wrapperRef} className="relative w-[160px] sm:w-[230px] md:w-[300px]">

      {/* ===== SEARCH INPUT ===== */}
      <form onSubmit={handleSubmit}>
        <div
          className="relative flex items-center gap-2 transition-all duration-300"
          style={{
            background: darkTheme
              ? focused ? 'rgba(41,227,173,0.04)' : 'rgba(255,255,255,0.04)'
              : focused ? 'rgba(41,227,173,0.03)' : 'rgba(0,0,0,0.04)',
            border: focused
              ? '1px solid rgba(41,227,173,0.35)'
              : darkTheme ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.1)',
            borderRadius: showDropdown ? '14px 14px 0 0' : '14px',
            padding: '7px 12px',
            boxShadow: focused
              ? darkTheme
                ? '0 0 0 3px rgba(41,227,173,0.06), inset 0 1px 0 rgba(255,255,255,0.04)'
                : '0 0 0 3px rgba(41,227,173,0.08)'
              : 'none',
          }}
        >
          {/* Search icon or spinner */}
          <div className="flex-shrink-0 transition-all duration-200">
            {loading ? (
              <div
                className="w-3.5 h-3.5 rounded-full border-2 border-transparent animate-spin"
                style={{ borderTopColor: '#29e3ad', borderRightColor: 'rgba(41,227,173,0.3)' }}
              />
            ) : (
              <BiSearch
                size={14}
                style={{ color: focused ? '#29e3ad' : darkTheme ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', transition: 'color 0.2s' }}
              />
            )}
          </div>

          <input
            ref={inputRef}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => { setFocused(true); results.length > 0 && setOpen(true); }}
            type="text"
            placeholder="Search movies, shows..."
            autoComplete="off"
            className="flex-1 bg-transparent outline-none min-w-0"
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: darkTheme ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)',
              letterSpacing: '0.01em',
            }}
          />

          {/* Placeholder color via inline style trick */}
          <style>{`
            input::placeholder { color: ${darkTheme ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'}; }
          `}</style>

          {input && (
            <button
              type="button"
              onClick={clear}
              className="flex-shrink-0 cursor-pointer flex items-center justify-center w-4 h-4 rounded-full transition-all duration-150"
              style={{
                background: darkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = darkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}
            >
              <IoClose size={10} style={{ color: darkTheme ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
            </button>
          )}
        </div>
      </form>

      {/* ===== DROPDOWN ===== */}
      {showDropdown && (
        <div
          className="absolute left-0 right-0 z-[200] overflow-hidden"
          style={{
            top: '100%',
            background: darkTheme ? '#0a0a0a' : '#ffffff',
            border: `1px solid ${darkTheme ? 'rgba(41,227,173,0.2)' : 'rgba(41,227,173,0.2)'}`,
            borderTop: 'none',
            borderRadius: '0 0 16px 16px',
            boxShadow: darkTheme
              ? '0 24px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(41,227,173,0.05)'
              : '0 16px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(41,227,173,0.08)',
          }}
        >
          {/* Top accent line */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(41,227,173,0.3), transparent)' }} />

          {/* Loading skeleton */}
          {loading && results.length === 0 && (
            <div className="px-3 py-3 flex flex-col gap-2.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-11 rounded-lg flex-shrink-0" style={{ background: darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="h-2.5 rounded-full w-3/4" style={{ background: darkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <div className="h-2 rounded-full w-1/2" style={{ background: darkTheme ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {results.map((item, idx) => {
            const poster = getPoster(item);
            const title = getTitle(item);
            const year = getYear(item);
            const rating = getRating(item);
            const isActive = idx === activeIdx;
            const isMovie = item.media_type === 'movie';

            return (
              <button
                key={`${item.media_type}-${item.id}`}
                onMouseDown={() => handleSelect(item)}
                onMouseEnter={() => setActiveIdx(idx)}
                className="w-full flex items-center gap-3 cursor-pointer text-left transition-all duration-150"
                style={{
                  padding: '8px 12px',
                  background: isActive
                    ? darkTheme ? 'rgba(41,227,173,0.05)' : 'rgba(41,227,173,0.04)'
                    : 'transparent',
                  borderBottom: idx !== results.length - 1
                    ? `1px solid ${darkTheme ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`
                    : 'none',
                }}
              >
                {/* Poster */}
                <div
                  className="flex-shrink-0 overflow-hidden rounded-lg"
                  style={{
                    width: 32, height: 44,
                    background: darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
                    border: isActive ? '1px solid rgba(41,227,173,0.3)' : '1px solid transparent',
                    transition: 'border-color 0.15s',
                  }}
                >
                  {poster ? (
                    <img src={poster} alt={title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {isMovie
                        ? <IoFilm size={13} style={{ color: darkTheme ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }} />
                        : <IoTv size={13} style={{ color: darkTheme ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }} />
                      }
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className="truncate"
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: isActive
                        ? '#29e3ad'
                        : darkTheme ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.82)',
                      transition: 'color 0.15s',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {/* Type chip */}
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        padding: '1.5px 5px',
                        borderRadius: '5px',
                        background: isMovie ? 'rgba(59,130,246,0.15)' : 'rgba(139,92,246,0.15)',
                        color: isMovie ? '#60a5fa' : '#a78bfa',
                      }}
                    >
                      {isMovie ? 'Film' : 'TV'}
                    </span>
                    {year && (
                      <span style={{ fontSize: '10px', color: darkTheme ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', fontWeight: 500 }}>
                        {year}
                      </span>
                    )}
                    {rating && (
                      <span
                        className="flex items-center gap-0.5"
                        style={{ fontSize: '10px', color: darkTheme ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', fontWeight: 500 }}
                      >
                        <FaStar size={7} style={{ color: '#fbbf24' }} />
                        {rating}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow on active */}
                <div
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
                    transition: 'all 0.15s',
                    color: '#29e3ad',
                    fontSize: '12px',
                  }}
                >
                  →
                </div>
              </button>
            );
          })}

          {/* See all footer */}
          {results.length > 0 && (
            <button
              onMouseDown={handleSubmit}
              className="w-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-150"
              style={{
                padding: '9px 12px',
                borderTop: `1px solid ${darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                background: 'transparent',
                fontSize: '11px',
                fontWeight: 600,
                color: '#29e3ad',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(41,227,173,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <BiSearch size={11} />
              See all results for &ldquo;{input}&rdquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Form;