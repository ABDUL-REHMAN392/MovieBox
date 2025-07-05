
import React, { useState } from 'react';
import Carousel from '../component/Carousel';
import DayWeekToggle from '../component/DayWeekToggle';
import MediaScroller from '../component/MediaScroller';
import { useSelector } from 'react-redux';

import FeedBack from '../component/FeedBack';

function Home() {
  const { darkTheme } = useSelector((state) => state.conditions);
  const [movieTimeWindow, setMovieTimeWindow] = useState("day");
  const [tvTimeWindow, setTvTimeWindow] = useState("day");

  return (
    <div className={`md:mt-15 ${darkTheme?'bg-black text-white':'bg-white text-black'}`}>
      <Carousel />

      {/* Trending Movies */}
      <div className="px-6 py-8" id='TrendingMovies'>
        <div className="flex flex-col md:flex-row md:items-center items-start md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Trending Movies</h2>
          <DayWeekToggle onChange={(value) => setMovieTimeWindow(value)} />
        </div>
        <MediaScroller type="movie" trending={movieTimeWindow} endpoint="trending" />
      </div>

      {/* Trending TV Shows */}
      <div className="px-6 py-8" id='TrendingTVShows'>
        <div className="flex flex-col md:flex-row md:items-center items-start md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Trending TV Shows</h2>
          <DayWeekToggle onChange={(value) => setTvTimeWindow(value)} />
        </div>
        <MediaScroller type="tv" trending={tvTimeWindow} endpoint="trending" />
      </div>

      {/* Upcoming Movies */}
      <div className="px-6 py-8" id='UpcomingMovies'>
        <div className="flex flex-col md:flex-row md:items-center items-start md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Upcoming Movies</h2>
        </div>
        <MediaScroller type="movie" endpoint="upcoming" />
      </div>

      {/* Upcoming TV Shows */}
      <div className="px-6 py-8" id='UpcomingTVShows'>
        <div className="flex flex-col md:flex-row md:items-center items-start md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Upcoming TV Shows</h2>
        </div>
        <MediaScroller type="tv" endpoint="upcoming" />
      </div>
      <FeedBack/>
    </div>
  );
}

export default Home;
