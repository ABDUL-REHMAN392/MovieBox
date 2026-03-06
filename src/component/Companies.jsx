import PropTypes from 'prop-types';

function Companies({ companies, darkTheme }) {
  if (!companies?.length) return null;

  return (
    <div>
      <h2 className={`text-xs font-bold mb-4 uppercase tracking-wider ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
        Production Companies
      </h2>
      <div className="flex gap-3 flex-wrap">
        {companies.filter(c => c.logo_path).map(company => (
          <div
            key={company.id}
            className={`flex items-center justify-center px-4 py-2.5 rounded-xl border transition-all ${
              darkTheme ? 'bg-white/5 border-white/8 hover:bg-white/10' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
              alt={company.name}
              className={`h-6 object-contain ${darkTheme ? 'brightness-0 invert opacity-60' : 'opacity-70'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Companies.propTypes = {
  companies: PropTypes.array,
  darkTheme: PropTypes.bool.isRequired,
};

export default Companies;