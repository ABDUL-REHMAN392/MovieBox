import PropTypes from 'prop-types';

function Cast({ cast, darkTheme }) {
  if (!cast || cast.length === 0) {
    return (
      <div className={darkTheme ? 'text-gray-400' : 'text-black'}>
        No cast data available.
      </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-3">
      {cast.map(actor => (
        <div key={actor.id} className="flex-shrink-0 w-24">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                : 'https://via.placeholder.com/150x225?text=No+Image'
            }
            alt={actor.name}
            className="w-full h-32 object-cover rounded-lg mb-1"
          />
          <p className={`text-xs text-center ${darkTheme ? '' : 'text-green-800'}`}>
            {actor.name}
          </p>
        </div>
      ))}
    </div>
  );
}

Cast.propTypes = {
  cast: PropTypes.array.isRequired,
  darkTheme: PropTypes.bool.isRequired,
};

export default Cast;
