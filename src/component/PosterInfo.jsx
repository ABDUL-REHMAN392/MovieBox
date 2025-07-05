import PropTypes from "prop-types";
import { FaCalendarAlt, FaClock, FaStar, FaLanguage, FaPlay } from "react-icons/fa";

function PosterInfo({ data, darkTheme, trailer }) {
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const posterUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : data.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img
        src={posterUrl}
        alt={data.title || data.name}
        className="rounded-xl shadow-lg w-full md:w-[300px] max-w-xs object-cover"
      />

      <div>
        <h1 className="text-4xl font-bold mb-4">{data.title || data.name}</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {data.genres?.map((genre) => (
            <span
              key={genre.id}
              className="bg-[#29e3ad] text-black px-3 py-1 rounded-full text-xs font-semibold"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-sm" style={{ color: darkTheme ? "#cbd5e1" : "#334155" }}>
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="text-[#29e3ad]" /> {data.release_date || data.first_air_date || "N/A"}
          </span>
          <span className="flex items-center gap-2">
            <FaClock className="text-[#29e3ad]" /> {formatRuntime(data.runtime)}
          </span>
          <span className="flex items-center gap-2">
            <FaStar className="text-yellow-400" /> {data.vote_average?.toFixed(1) || "N/A"}
          </span>
          <span className="flex items-center gap-2 flex-wrap">
            <FaLanguage className="text-[#29e3ad]" />
            {data.spoken_languages?.map((lang) => (
              <span
                key={lang.iso_639_1}
                className={`${darkTheme ? "bg-gray-700" : "bg-gray-300"} ml-1 px-2 py-0.5 rounded text-xs`}
              >
                {lang.english_name}
              </span>
            ))}
          </span>
        </div>

        <p className="mt-4 mb-6 text-sm" style={{ color: darkTheme ? "#e0e0e0" : "#444" }}>
          {data.overview || "No description available."}
        </p>

        {trailer && (
          <a
            href={trailer}
            target="_blank"
            rel="noopener noreferrer"
            className={`${darkTheme ? "bg-[#29e3ad] text-black hover:bg-[#1ed2a4]" : "bg-[#29e3ad] text-black hover:bg-[#29e3ad]"} inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition`}
          >
            <FaPlay /> Watch Trailer
          </a>
        )}
      </div>
    </div>
  );
}

PosterInfo.propTypes = {
  data: PropTypes.object.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  trailer: PropTypes.string,
};

export default PosterInfo;
