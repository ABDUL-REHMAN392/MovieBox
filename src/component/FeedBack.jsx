import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function FeedBack() {
const { darkTheme } = useSelector(state => state.conditions);
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      };

      const trendingRes = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`, { headers });
      const trendingData = await trendingRes.json();

      let allReviews = [];

      for (const item of trendingData.results.slice(0, 8)) {
        const type = item.media_type;
        const id = item.id;
        const reviewsRes = await fetch(`https://api.themoviedb.org/3/${type}/${id}/reviews?language=en-US&page=1`, { headers });
        const reviewsData = await reviewsRes.json();

        if (reviewsData.results?.length > 0) {
          allReviews.push(...reviewsData.results.slice(0, 2));
        }

        if (allReviews.length >= 10) break;
      }

      setReviews(allReviews.slice(0, 10));
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <section className={`py-12 px-4 sm:px-6 lg:px-12 ${darkTheme ? 'bg-gradient-to-b from-black via-gray-900 to-black text-white' : 'bg-gradient-to-b from-white via-gray-50 to-white text-black'}`}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center tracking-wide">
        What People Are Saying
      </h2>

      {loading ? (
        <div className="text-center text-sm">Loading testimonials...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-sm">No reviews available right now.</div>
      ) : (
        <div className="relative flex justify-center items-center overflow-hidden min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={reviews[currentIndex].id}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className={`w-full max-w-xs sm:max-w-md md:max-w-2xl mx-4 px-5 sm:px-8 py-6 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-500 ${
                darkTheme
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-black/5'
              }`}
            >
              <div className="flex justify-center mb-3 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} size={16} />
                ))}
              </div>
              <p className="italic text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 text-center">
                "{reviews[currentIndex].content.length > 220
                  ? `${reviews[currentIndex].content.slice(0, 220)}...`
                  : reviews[currentIndex].content}"
              </p>
              <div className="font-semibold text-xs sm:text-sm text-right">
                — {reviews[currentIndex].author || 'Anonymous'}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

export default FeedBack;
