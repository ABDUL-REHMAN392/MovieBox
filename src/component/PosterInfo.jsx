import PropTypes from "prop-types";
import { FaCalendarAlt, FaClock, FaStar, FaPlay } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";

function PosterInfo({ data, darkTheme, trailer }) {
  const formatRuntime = (m) => {
    if (!m) return null;
    return `${Math.floor(m / 60)}h ${m % 60}m`;
  };

  const posterUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : data.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const runtime = formatRuntime(data.runtime);
  const subtext = darkTheme ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Poster */}
      <div className="flex-shrink-0 w-full md:w-[220px]">
        <img
          src={posterUrl}
          alt={data.title || data.name}
          className="rounded-2xl shadow-2xl w-full md:w-[220px] object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 space-y-4">
        {/* Title */}
        <div>
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight mb-1 ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
            {data.title || data.name}
          </h1>
          {data.tagline && (
            <p className="text-sm text-[#29e3ad] italic">"{data.tagline}"</p>
          )}
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5">
          {data.genres?.map(genre => (
            <span key={genre.id} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#29e3ad]/15 text-[#29e3ad] border border-[#29e3ad]/20">
              {genre.name}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className={`flex flex-wrap gap-4 text-sm ${subtext}`}>
          {data.vote_average > 0 && (
            <span className="flex items-center gap-1.5">
              <FaStar className="text-yellow-400" size={13} />
              <span className={`font-bold ${darkTheme ? 'text-white' : 'text-gray-800'}`}>{data.vote_average?.toFixed(1)}</span>
              <span className="text-xs">/10</span>
            </span>
          )}
          {(data.release_date || data.first_air_date) && (
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-[#29e3ad]" size={12} />
              {data.release_date || data.first_air_date}
            </span>
          )}
          {runtime && (
            <span className="flex items-center gap-1.5">
              <FaClock className="text-[#29e3ad]" size={12} />
              {runtime}
            </span>
          )}
          {data.spoken_languages?.length > 0 && (
            <span className="flex items-center gap-1.5">
              <IoLanguage className="text-[#29e3ad]" size={14} />
              {data.spoken_languages.slice(0, 2).map(l => l.english_name).join(', ')}
            </span>
          )}
        </div>

        {/* Overview */}
        <p className={`text-sm leading-relaxed ${subtext}`}>
          {data.overview || "No description available."}
        </p>

        {/* Trailer button */}
        {trailer && (
          <a href={trailer} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#29e3ad] text-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#22d4a0] hover:scale-105 transition-all shadow-lg shadow-[#29e3ad]/20 cursor-pointer"
          >
            <FaPlay size={11} /> Watch Trailer
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