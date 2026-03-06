import PropTypes from 'prop-types';

export function Cast({ cast, darkTheme }) {
  if (!cast?.length) return (
    <p className={`text-sm ${darkTheme ? 'text-gray-600' : 'text-gray-400'}`}>No cast data available.</p>
  );

  return (
    <div>
      <h2 className={`text-base font-bold mb-4 uppercase tracking-wider text-xs ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
        Cast
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {cast.map(actor => (
          <div key={actor.id} className="flex-shrink-0 w-20 group">
            <div className="relative rounded-xl overflow-hidden mb-2">
              <img
                src={actor.profile_path
                  ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                  : 'https://via.placeholder.com/150x225?text=?'}
                alt={actor.name}
                className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
            </div>
            <p className={`text-[10px] text-center font-medium leading-tight ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              {actor.name}
            </p>
            {actor.character && (
              <p className={`text-[9px] text-center mt-0.5 ${darkTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                {actor.character}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

Cast.propTypes = { cast: PropTypes.array.isRequired, darkTheme: PropTypes.bool.isRequired };
export default Cast;