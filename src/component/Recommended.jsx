import PropTypes from "prop-types";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ShowCard from "../component/ShowCard";
import { useRef } from "react";

function Recommended({ recommended, type, darkTheme }) {
  const recRef = useRef(null);

  return (
    <div>
      <h2 className={`text-xl font-bold mb-4 ${darkTheme ? "" : "text-green-700"}`}>
        Recommended {type === "movie" ? "Movies" : "TV Shows"}
      </h2>

      {recommended.length === 0 ? (
        <p className={`${darkTheme ? "text-gray-400" : "text-green-600"}`}>
          No recommendations available.
        </p>
      ) : (
        <div className="relative">
          <button
            onClick={() => recRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
            className={`cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-20 ${
              darkTheme
                ? "bg-[#29e3ad] hover:bg-[#1ed2a4] text-black"
                : "bg-green-400 hover:bg-green-500 text-black"
            } shadow-lg w-10 h-10 flex items-center justify-center rounded-full transition duration-300`}
            aria-label="Scroll Left Recommended"
          >
            <LuChevronLeft size={24} />
          </button>

          <button
            onClick={() => recRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
            className={`cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-20 ${
              darkTheme
                ? "bg-[#29e3ad] hover:bg-[#1ed2a4] text-black"
                : "bg-green-400 hover:bg-green-500 text-black"
            } shadow-lg w-10 h-10 flex items-center justify-center rounded-full transition duration-300`}
            aria-label="Scroll Right Recommended"
          >
            <LuChevronRight size={24} />
          </button>

          <div ref={recRef} className="flex gap-6 overflow-x-hidden scroll-smooth py-2">
            {recommended.map((item) => {
              const imageUrl = item.poster_path
                ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                : item.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                : "https://via.placeholder.com/500x750?text=No+Image";

              return (
                <ShowCard
                  key={item.id}
                  fullData={item}
                  image={imageUrl}
                  title={item.title || item.name}
                  rating={item.vote_average?.toFixed(1)}
                  releaseYear={(item.release_date || item.first_air_date || "").slice(0, 4)}
                  type={type}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

Recommended.propTypes = {
  recommended: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  darkTheme: PropTypes.bool.isRequired,
};

export default Recommended;
