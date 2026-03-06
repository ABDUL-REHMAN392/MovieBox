import { FaPlay } from 'react-icons/fa';
import PropTypes from 'prop-types';

function TrailerButton({ trailerUrl }) {
  if (!trailerUrl) return null;

  return (
    <a
      href={trailerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-[#29e3ad] text-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#22d4a0] hover:scale-105 transition-all shadow-lg shadow-[#29e3ad]/20 cursor-pointer"
    >
      <FaPlay size={11} /> Watch Trailer
    </a>
  );
}

TrailerButton.propTypes = {
  trailerUrl: PropTypes.string,
  darkTheme: PropTypes.bool,
};

export default TrailerButton;