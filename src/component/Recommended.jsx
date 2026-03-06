import PropTypes from "prop-types";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ShowCard from "../component/ShowCard";
import { useRef } from "react";

function Recommended({ recommended, type, darkTheme }) {
  const recRef = useRef(null);
  const scroll = (offset) => recRef.current?.scrollBy({ left: offset, behavior: "smooth" });

  const subtext = darkTheme ? 'text-gray-400' : 'text-gray-500';

  if (!recommended?.length) return null;

  return (
    <div>
      <h2 className={`text-xs font-bold mb-4 uppercase tracking-wider ${subtext}`}>
        More Like This
      </h2>

      <div className="relative">
        <button onClick={() => scroll(-400)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#29e3ad] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer">
          <LuChevronLeft size={18} />
        </button>

        <button onClick={() => scroll(400)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#29e3ad] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer">
          <LuChevronRight size={18} />
        </button>

        <div ref={recRef} className="flex gap-4 overflow-x-auto py-2 px-1 scroll-smooth scrollbar-hide">
          {recommended.map(item => (
            <ShowCard
              key={item.id}
              fullData={item}
              image={item.poster_path
                ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                : item.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                : null}
              title={item.title || item.name}
              rating={item.vote_average?.toFixed(1)}
              releaseYear={(item.release_date || item.first_air_date || "").slice(0, 4)}
              type={type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Recommended.propTypes = {
  recommended: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  darkTheme: PropTypes.bool.isRequired,
};

export default Recommended;