import PropTypes from 'prop-types';
function Backdrop({ backdropPath, darkTheme }) {
  if (!backdropPath) return null;

  const overlayColor = darkTheme
    ? 'rgba(0,0,0,0.7)'
    : 'rgba(255,255,255,0.5)';

  return (
    <div
      className="absolute top-0 left-0 right-0 h-[650px] z-0 backdrop-blur-sm"
      style={{
        backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}), url(https://image.tmdb.org/t/p/original${backdropPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );
}

Backdrop.propTypes = {
  backdropPath: PropTypes.string,
  darkTheme: PropTypes.bool.isRequired,
};

export default Backdrop;