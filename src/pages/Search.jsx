import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ShowCard from "../component/ShowCard";
import { useSelector } from "react-redux";
import { BiSearch } from "react-icons/bi";

function Search() {
  const { darkTheme } = useSelector(state => state.conditions);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const observer = useRef();
  const lastElementRef = useRef();

  const fetchResults = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const headers = { accept: "application/json", Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` };
      await new Promise(r => setTimeout(r, 800));
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`,
        { headers }
      );
      const data = await res.json();
      if (!data.results?.length || page >= data.total_pages) setHasMore(false);
      setTotalResults(data.total_results || 0);
      setResults(prev => [...prev, ...(data.results || [])]);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { setResults([]); setPage(1); setHasMore(true); setTotalResults(0); }, [query]);
  useEffect(() => { fetchResults(); }, [page, query]);

  useEffect(() => {
    if (!hasMore || loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setPage(prev => prev + 1);
    });
    if (lastElementRef.current) observer.current.observe(lastElementRef.current);
    return () => observer.current?.disconnect();
  }, [loading, hasMore]);

  const bg = darkTheme ? 'bg-black text-white' : 'bg-gray-50 text-gray-900';
  const subtext = darkTheme ? 'text-gray-500' : 'text-gray-400';

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 md:px-10 ${bg}`}>

      {/* Header */}
      <div className="mb-8 mt-2">
        <div className="flex items-center gap-2 mb-1">
          <BiSearch className="text-[#29e3ad]" size={18} />
          <p className={`text-xs uppercase tracking-widest font-semibold ${subtext}`}>Search Results</p>
        </div>
        <h2 className="text-2xl font-bold">
          Results for{' '}
          <span className="text-[#29e3ad]">"{query}"</span>
        </h2>
        {totalResults > 0 && (
          <p className={`text-sm mt-1 ${subtext}`}>{totalResults.toLocaleString()} results found</p>
        )}
      </div>

      {/* Empty state */}
      {results.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-60 gap-3">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${darkTheme ? 'bg-white/5' : 'bg-gray-100'}`}>
            <BiSearch size={24} className={subtext} />
          </div>
          <p className={`text-sm ${subtext}`}>No results found for "{query}"</p>
          <p className={`text-xs ${darkTheme ? 'text-gray-600' : 'text-gray-300'}`}>Try a different search term</p>
        </div>
      )}

      {/* Grid */}
      {results.length > 0 && (
        <div className="grid gap-4 justify-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {results.map((item, index) => {
            const card = (
              <ShowCard
                fullData={item}
                image={item.poster_path
                  ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                  : item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                  : null}
                title={item.title || item.name}
                rating={item.vote_average?.toFixed(1)}
                releaseYear={(item.release_date || item.first_air_date || "").slice(0, 4)}
                type={item.media_type}
              />
            );
            if (results.length === index + 1) {
              return <div ref={lastElementRef} key={`${item.id}-${index}`}>{card}</div>;
            }
            return <div key={`${item.id}-${index}`}>{card}</div>;
          })}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <div className="w-5 h-5 border-2 border-gray-700 border-t-[#29e3ad] rounded-full animate-spin" />
          <span className={`text-sm ${subtext}`}>Loading...</span>
        </div>
      )}

      {!hasMore && results.length > 0 && (
        <p className={`text-center py-8 text-xs ${subtext}`}>— End of results —</p>
      )}
    </div>
  );
}

export default Search;