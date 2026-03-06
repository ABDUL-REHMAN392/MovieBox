import { useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useSelector } from "react-redux";
import ShowCard from "./ShowCard";

function SkeletonCard({ darkTheme }) {
  return (
    <div className="flex-shrink-0 w-[170px]">
      <div className={`w-full h-[250px] rounded-xl animate-pulse mb-2 ${darkTheme ? 'bg-white/6' : 'bg-gray-200'}`} />
      <div className={`h-3 rounded animate-pulse mb-1.5 w-3/4 ${darkTheme ? 'bg-white/6' : 'bg-gray-200'}`} />
      <div className={`h-3 rounded animate-pulse w-1/2 ${darkTheme ? 'bg-white/6' : 'bg-gray-200'}`} />
    </div>
  );
}

function MediaScroller({ type = "movie", trending = "", endpoint = "" }) {
  const { darkTheme } = useSelector(state => state.conditions);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    let url = "";
    if (endpoint === "trending") {
      url = `https://api.themoviedb.org/3/trending/${type}/${trending}?language=en-US`;
    } else if (endpoint === "upcoming") {
      url = type === "movie"
        ? `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`
        : `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1`;
    }

    fetch(url, {
      headers: { accept: "application/json", Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
    })
      .then(r => r.json())
      .then(json => {
        setTimeout(() => { setData(json.results || []); setLoading(false); }, 600);
      })
      .catch(() => setLoading(false));
  }, [type, trending, endpoint]);

  const scroll = (offset) => scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#29e3ad] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer"
        onClick={() => scroll(-400)}
      >
        <LuChevronLeft size={18} />
      </button>

      {/* Right arrow */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#29e3ad] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer"
        onClick={() => scroll(400)}
      >
        <LuChevronRight size={18} />
      </button>

      {/* Scroll container */}
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto py-2 px-1 scroll-smooth scrollbar-hide">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} darkTheme={darkTheme} />)
          : data.map(item => (
            <ShowCard
              key={item.id}
              image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              title={item.title || item.name}
              rating={item.vote_average?.toFixed(1)}
              releaseYear={(item.release_date || item.first_air_date || "").split("-")[0]}
              fullData={item}
              type={type}
            />
          ))
        }
      </div>
    </div>
  );
}

export default MediaScroller;