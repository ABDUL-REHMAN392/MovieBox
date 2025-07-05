
import { FaPlay } from 'react-icons/fa';
import PropTypes from 'prop-types';

function TrailerButton({ trailerUrl, darkTheme }) {
  if (!trailerUrl) return null;

  return (
    <a
      href={trailerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${darkTheme
        ? 'bg-[#29e3ad] text-black hover:bg-[#1ed2a4]'
        : 'bg-[#29e3ad] text-black hover:bg-[#24c9a2]'
        } inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition`}
    >
      <FaPlay /> Watch Trailer
    </a>
  );
}

TrailerButton.propTypes = {
  trailerUrl: PropTypes.string,
  darkTheme: PropTypes.bool.isRequired,
};

export default TrailerButton;
