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
  9648: "Mystery", 10749: "Romance", 878: "Science Fiction",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
};

function Carousel() {
  const [data, setData] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const { darkTheme } = useSelector(state => state.conditions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.themoviedb.org/3/trending/all/week?language=en-US", options);
        const json = await res.json();
        setData(json.results.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % data.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data]);

  const currentItem = data[currentIdx];
  const bgImage = currentItem?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`
    : null;

  const genreNames = currentItem?.genre_ids
    ? currentItem.genre_ids.map((id) => genreMap[id] || "Unknown").join(", ")
    : "N/A";

  // Fetch trailer whenever current item changes
  useEffect(() => {
    if (!currentItem) return;

    const fetchTrailer = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/${currentItem.media_type}/${currentItem.id}/videos?language=en-US`, options);
        const json = await res.json();

        const trailer = json.results?.find(v => v.type === "Trailer" && v.site === "YouTube");
        setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null);
      } catch (err) {
        console.error(err);
        setTrailerUrl(null);
      }
    };

    fetchTrailer();
  }, [currentItem]);

  if (loading) {
    return (
      <div className={`relative w-full h-[500px] overflow-hidden ${darkTheme ? 'bg-gray-700' : 'bg-gray-300'} animate-pulse`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent px-6 md:px-16 pb-12 flex items-end md:items-center">
          <div className="max-w-full md:max-w-[600px] space-y-4">
            <div className={`${darkTheme ? 'bg-gray-600' : 'bg-gray-400'} h-10 w-3/4 rounded`} />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`${darkTheme ? 'bg-gray-600' : 'bg-gray-400'} h-4 w-16 rounded-full`} />
              ))}
            </div>
            <div className="space-y-2">
              <div className={`${darkTheme ? 'bg-gray-600' : 'bg-gray-400'} h-3 w-1/2 rounded`} />
              <div className={`${darkTheme ? 'bg-gray-600' : 'bg-gray-400'} h-3 w-1/3 rounded`} />
              <div className={`${darkTheme ? 'bg-gray-600' : 'bg-gray-400'} h-16 w-full rounded`} />
            </div>
            <div className={`${darkTheme ? 'bg-gray-600' : 'bg-gray-400'} h-10 w-32 rounded-full`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden shadow-2xl">
      {bgImage && (
        <img
          src={bgImage}
          alt="background"
          className="w-full h-full object-cover brightness-75 scale-100 hover:scale-105 transition-transform duration-1000"
        />
      )}

      <div className="absolute inset-0 flex items-end md:items-center md:justify-start bg-gradient-to-t from-black/80 to-transparent px-6 md:px-16 pb-12">
        <div className="max-w-full md:max-w-[600px] text-white space-y-4 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
            {currentItem?.title || currentItem?.original_name || "No Title"}
          </h1>
          <div className="text-xs md:text-sm flex flex-wrap gap-2">
            {genreNames.split(", ").map((genre, i) => (
              <span key={i} className="bg-[#29e3ad] text-black px-2 py-1 rounded-full text-[10px] md:text-xs">
                {genre}
              </span>
            ))}
          </div>
          <div className="text-sm md:text-base space-y-2">
            <p>
              <span className="font-semibold text-[#29e3ad]">Release Date:</span>{" "}
              {currentItem?.release_date || currentItem?.first_air_date || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-[#29e3ad]">Rating:</span>{" "}
              {currentItem?.vote_average || "N/A"}
            </p>
            <p className="max-w-[90%] md:max-w-[70%] leading-relaxed text-gray-300">
              <span className="font-semibold text-[#29e3ad]">Description:</span>{" "}
              {currentItem?.overview || "No Description Available"}
            </p>
          </div>
          <button
            onClick={() => {
              if (trailerUrl) {
                window.open(trailerUrl, "_blank");
              } else {
                alert("Trailer not available");
              }
            }}
            className="mt-4 flex cursor-pointer items-center gap-2 bg-[#29e3ad] text-black font-semibold px-4 py-2 rounded-full hover:bg-[#24c9a2] hover:scale-105 transition-transform shadow-lg"
          >
            <FaPlay /> Watch Now
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
        {data.map((_, index) => (
          <div
            key={index}
            className={`transition-all w-10 h-1 rounded-full ${index === currentIdx ? "bg-[#29e3ad] scale-110" : "bg-gray-400/50"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
