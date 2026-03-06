import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

function FeedBack() {
  const { darkTheme } = useSelector(state => state.conditions);
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const headers = { accept: 'application/json', Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` };
        const trendingRes = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`, { headers });
        const trendingData = await trendingRes.json();
        let allReviews = [];
        for (const item of trendingData.results.slice(0, 8)) {
          const reviewsRes = await fetch(`https://api.themoviedb.org/3/${item.media_type}/${item.id}/reviews?language=en-US&page=1`, { headers });
          const reviewsData = await reviewsRes.json();
          if (reviewsData.results?.length > 0) {
            const enriched = reviewsData.results.slice(0, 2).map(r => ({
              ...r,
              mediaTitle: item.title || item.name,
              rating: r.author_details?.rating,
            }));
            allReviews.push(...enriched);
          }
          if (allReviews.length >= 10) break;
        }
        setReviews(allReviews.slice(0, 10));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    if (!reviews.length) return;
    const interval = setInterval(() => goTo(1), 5000);
    return () => clearInterval(interval);
  }, [reviews, currentIndex]);

  const goTo = (dir) => {
    setDirection(dir);
    setCurrentIndex(prev => (prev + dir + reviews.length) % reviews.length);
  };

  const bg = darkTheme ? 'bg-black' : 'bg-gray-50';
  const cardBg = darkTheme ? 'bg-white/4 border-white/8' : 'bg-white border-gray-200';
  const text = darkTheme ? 'text-white' : 'text-gray-900';
  const subtext = darkTheme ? 'text-gray-500' : 'text-gray-400';

  const variants = {
    enter: dir => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: dir => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.25 } }),
  };

  const review = reviews[currentIndex];

  return (
    <section className={`py-16 px-4 ${bg}`}>
      <div className="text-center mb-10">
        <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 ${subtext}`}>Community</p>
        <h2 className={`text-2xl font-bold ${text}`}>What People Are Saying</h2>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="w-5 h-5 border-2 border-gray-700 border-t-[#29e3ad] rounded-full animate-spin" />
        </div>
      ) : !reviews.length ? (
        <p className={`text-center text-sm ${subtext}`}>No reviews available right now.</p>
      ) : (
        <div className="relative max-w-2xl mx-auto">
          <div className="min-h-[220px] flex items-center overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={review.id + currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`w-full rounded-2xl border p-6 md:p-8 ${cardBg}`}
              >
                <div className="h-[2px] w-10 bg-[#29e3ad] rounded-full mb-5" />
                <FaQuoteLeft className="text-[#29e3ad]/25 text-3xl mb-3" />
                <p className={`text-sm leading-relaxed mb-5 ${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{review.content.length > 260 ? `${review.content.slice(0, 260)}...` : review.content}"
                </p>
                <div className={`flex items-center justify-between pt-4 border-t ${darkTheme ? 'border-white/6' : 'border-gray-100'}`}>
                  <div>
                    <p className={`text-xs font-semibold ${text}`}>{review.author || 'Anonymous'}</p>
                    {review.mediaTitle && <p className={`text-[10px] mt-0.5 ${subtext}`}>on {review.mediaTitle}</p>}
                  </div>
                  {review.rating && (
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" size={11} />
                      <span className={`text-xs font-semibold ${text}`}>{review.rating}/10</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => goTo(-1)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${darkTheme ? 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white' : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 shadow-sm'}`}>
              <IoChevronBack size={14} />
            </button>
            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                  className={`rounded-full transition-all cursor-pointer ${i === currentIndex ? 'w-5 h-1.5 bg-[#29e3ad]' : `w-1.5 h-1.5 ${darkTheme ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-300 hover:bg-gray-400'}`}`}
                />
              ))}
            </div>
            <button onClick={() => goTo(1)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${darkTheme ? 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white' : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 shadow-sm'}`}>
              <IoChevronForward size={14} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default FeedBack;