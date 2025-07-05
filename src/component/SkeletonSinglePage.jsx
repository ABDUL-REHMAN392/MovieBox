
import React from 'react';
import PropTypes from 'prop-types';

function SkeletonSinglePage({ darkTheme }) {
  const baseColor = darkTheme ? 'bg-gray-700' : 'bg-gray-300';

  return (
    <div className={`min-h-screen px-6 py-10 ${darkTheme ? 'bg-black' : 'bg-white'}`}>
      <div className="animate-pulse space-y-6">

        {/* Poster + Title */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className={`${baseColor} w-full md:w-[300px] h-[450px] rounded-xl`} />

          <div className="flex flex-col gap-4 flex-1">
            <div className={`${baseColor} h-8 w-3/4 rounded`} />
            <div className="flex gap-2">
              <div className={`${baseColor} h-5 w-20 rounded-full`} />
              <div className={`${baseColor} h-5 w-20 rounded-full`} />
            </div>
            <div className={`${baseColor} h-4 w-full rounded`} />
            <div className={`${baseColor} h-4 w-5/6 rounded`} />
            <div className={`${baseColor} h-10 w-40 rounded`} />
          </div>
        </div>

        {/* Companies Skeleton */}
        <div className="flex gap-4 flex-wrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`${baseColor} h-12 w-32 rounded-lg`} />
          ))}
        </div>

        {/* Cast Skeleton */}
        <div className="flex gap-4 overflow-x-auto pb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-shrink-0">
              <div className={`${baseColor} w-24 h-32 rounded-lg mb-1`} />
              <div className={`${baseColor} h-3 w-20 rounded`} />
            </div>
          ))}
        </div>

        {/* Recommended Skeleton */}
        <div className="flex gap-4 overflow-x-hidden pb-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`${baseColor} w-40 h-60 rounded-lg`} />
          ))}
        </div>

      </div>
    </div>
  );
}

SkeletonSinglePage.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};

export default SkeletonSinglePage;
