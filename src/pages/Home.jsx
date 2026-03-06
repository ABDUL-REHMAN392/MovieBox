import { useState } from 'react';
import Carousel from '../component/Carousel';
import DayWeekToggle from '../component/DayWeekToggle';
import MediaScroller from '../component/MediaScroller';
import FeedBack from '../component/FeedBack';
import { useSelector } from 'react-redux';
import { IoFilm, IoTv, IoTime } from 'react-icons/io5';

function SectionHeader({ title,  toggle, darkTheme }) {
  const text = darkTheme ? 'text-white' : 'text-gray-900';
  const subtext = darkTheme ? 'text-gray-600' : 'text-gray-300';

  return (
    <div className="flex flex-row sm:flex-row sm:items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-2.5">
                <h2 className={`text-lg font-bold ${text}`}>{title}</h2>
      </div>
      {toggle}
    </div>
  );
}

function Home() {
  const { darkTheme } = useSelector(state => state.conditions);
  const [movieTimeWindow, setMovieTimeWindow] = useState("day");
  const [tvTimeWindow, setTvTimeWindow] = useState("day");

  const bg = darkTheme ? 'bg-black text-white' : 'bg-gray-50 text-gray-900';
  const sectionA = darkTheme ? 'bg-black' : 'bg-white';
  const sectionB = darkTheme ? 'bg-[#080808]' : 'bg-gray-50';

  return (
    <div className={`md:mt-14 ${bg}`}>
      <Carousel />

      {/* Trending Movies */}
      <div className={`px-5 md:px-8 py-8 ${sectionA}`} id="TrendingMovies">
        <SectionHeader
          title="Trending Movies"
          icon={<IoFilm size={16} />}
          toggle={<DayWeekToggle onChange={setMovieTimeWindow} />}
          darkTheme={darkTheme}
        />
        <MediaScroller type="movie" trending={movieTimeWindow} endpoint="trending" />
      </div>

      {/* Trending TV Shows */}
      <div className={`px-5 md:px-8 py-8 ${sectionB}`} id="TrendingTVShows">
        <SectionHeader
          title="Trending TV Shows"
          icon={<IoTv size={16} />}
          toggle={<DayWeekToggle onChange={setTvTimeWindow} />}
          darkTheme={darkTheme}
        />
        <MediaScroller type="tv" trending={tvTimeWindow} endpoint="trending" />
      </div>

      {/* Upcoming Movies */}
      <div className={`px-5 md:px-8 py-8 ${sectionA}`} id="UpcomingMovies">
        <SectionHeader
          title="Upcoming Movies"
          icon={<IoTime size={16} />}
          darkTheme={darkTheme}
        />
        <MediaScroller type="movie" endpoint="upcoming" />
      </div>

      {/* Upcoming TV Shows */}
      <div className={`px-5 md:px-8 py-8 ${sectionB}`} id="UpcomingTVShows">
        <SectionHeader
          title="Upcoming TV Shows"
          icon={<IoTime size={16} />}
          darkTheme={darkTheme}
        />
        <MediaScroller type="tv" endpoint="upcoming" />
      </div>

      <FeedBack />
    </div>
  );
}

export default Home;