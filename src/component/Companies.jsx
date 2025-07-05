import PropTypes from 'prop-types';

function Companies({ companies, darkTheme }) {
  if (!companies || companies.length === 0) {
    return <div className={darkTheme ? 'text-gray-400' : 'text-green-700'}>No production company data available.</div>;
  }

  return (
    <div>
      <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkTheme ? 'text-white' : 'text-black'}`}>
        Production Companies
      </h2>
      <div className="flex gap-6 flex-wrap">
        {companies.map(company => (
          <div
            key={company.id}
            className={`flex items-center gap-2 ${darkTheme ? 'bg-gray-800' : 'bg-green-100'} p-2 rounded-lg max-h-12`}
          >
            {company.logo_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={company.name}
                className="h-8 object-contain"
              />
            ) : (
              <span className='text-xs text-gray-500'>{company.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

Companies.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      logo_path: PropTypes.string,
    })
  ),
  darkTheme: PropTypes.bool.isRequired,
};

export default Companies;
