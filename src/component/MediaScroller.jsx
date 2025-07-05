import { useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useSelector } from "react-redux";
import ShowCard from "./ShowCard";

// Skeleton loader
function SkeletonCard({ darkTheme }) {
  return (
    <div className="w-40 flex-shrink-0">
      <div className={`w-full h-60 ${darkTheme ? "bg-gray-700" : "bg-gray-300"} animate-pulse rounded-xl mb-2`} />
      <div className={`h-4 ${darkTheme ? "bg-gray-700" : "bg-gray-300"} animate-pulse rounded mb-1 w-3/4`} />
      <div className={`h-4 ${darkTheme ? "bg-gray-700" : "bg-gray-300"} animate-pulse rounded w-1/2`} />
    </div>
  );
}

function MediaScroller({ type = "movie", trending = "", endpoint = "" }) {
  const { darkTheme } = useSelector((state) => state.conditions);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = "";
        if (endpoint === "trending") {
          url = `https://api.themoviedb.org/3/trending/${type}/${trending}?language=en-US`;
        } else if (endpoint === "upcoming") {
          url = type === "movie"
            ? `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`
            : `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1`;
        }

        const res = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        });

        const json = await res.json();
        setTimeout(() => {
          setData(json.results || []);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error(`Error fetching ${endpoint} data:`, err);
        setLoading(false);
      }
    };

    fetchData();
  }, [type, trending, endpoint]);

  const scroll = (offset) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          className="bg-[#29e3ad] cursor-pointer text-black p-2 rounded-full shadow hover:opacity-90"
          onClick={() => scroll(-400)}
        >
          <LuChevronLeft size={24} />
        </button>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          className="bg-[#29e3ad] cursor-pointer text-black p-2 rounded-full shadow hover:opacity-90"
          onClick={() => scroll(400)}
        >
          <LuChevronRight size={24} />
        </button>
      </div>

      {/* Scrolling Content */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden py-3 px-1 scroll-smooth scrollbar-hide"
      >
        {loading
          ? Array.from({ length: 10 }).map((_, idx) => (
              <SkeletonCard key={idx} darkTheme={darkTheme} />
            ))
          : data.map((item) => (
              <ShowCard
                key={item.id}
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                title={item.title || item.name}
                rating={item.vote_average?.toFixed(1)}
                releaseYear={(item.release_date || item.first_air_date || "").split("-")[0]}
                fullData={item}
                type={type}
              />
            ))}
      </div>
    </div>
  );
}

export default MediaScroller;
