import PropTypes from 'prop-types';

function SkeletonSinglePage({ darkTheme }) {
  const base = darkTheme ? 'bg-white/6' : 'bg-gray-200';
  const bg = darkTheme ? 'bg-black' : 'bg-gray-50';

  return (
    <div className={`min-h-screen pt-20 px-6 py-10 ${bg}`}>
      <div className="max-w-6xl mx-auto animate-pulse space-y-10">

        {/* Poster + Info row */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className={`${base} w-full md:w-[220px] h-[320px] rounded-2xl flex-shrink-0`} />

          {/* Info */}
          <div className="flex-1 space-y-4 pt-2">
            <div className={`${base} h-8 w-3/5 rounded-xl`} />
            <div className={`${base} h-3 w-1/4 rounded-full`} />
            <div className="flex gap-2">
              <div className={`${base} h-6 w-20 rounded-full`} />
              <div className={`${base} h-6 w-16 rounded-full`} />
              <div className={`${base} h-6 w-24 rounded-full`} />
            </div>
            <div className="flex gap-4 pt-1">
              <div className={`${base} h-4 w-24 rounded`} />
              <div className={`${base} h-4 w-16 rounded`} />
              <div className={`${base} h-4 w-20 rounded`} />
            </div>
            <div className="space-y-2 pt-2">
              <div className={`${base} h-3 w-full rounded`} />
              <div className={`${base} h-3 w-5/6 rounded`} />
              <div className={`${base} h-3 w-4/6 rounded`} />
            </div>
            <div className={`${base} h-10 w-36 rounded-full mt-2`} />
          </div>
        </div>

        {/* Companies */}
        <div>
          <div className={`${base} h-3 w-32 rounded mb-4`} />
          <div className="flex gap-3 flex-wrap">
            {[80, 96, 72].map((w, i) => (
              <div key={i} className={`${base} h-12 rounded-xl`} style={{ width: `${w}px` }} />
            ))}
          </div>
        </div>

        {/* Cast */}
        <div>
          <div className={`${base} h-3 w-20 rounded mb-4`} />
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className={`${base} w-20 h-28 rounded-xl`} />
                <div className={`${base} h-2.5 w-16 rounded`} />
                <div className={`${base} h-2 w-12 rounded`} />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div>
          <div className={`${base} h-3 w-28 rounded mb-4`} />
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`${base} flex-shrink-0 w-[170px] h-[250px] rounded-xl`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

SkeletonSinglePage.propTypes = { darkTheme: PropTypes.bool.isRequired };
export default SkeletonSinglePage;