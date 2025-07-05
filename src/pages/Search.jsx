import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";
import ShowCard from "../component/ShowCard";
import { useSelector } from "react-redux";

function Search() {
   const { darkTheme } = useSelector((state) => state.conditions);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchResults = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const headers = {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      };

      await new Promise((res) => setTimeout(res, 1500)); // Delay for 1 second

      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`,
        { headers }
      );
      const data = await response.json();

      if (data.results?.length === 0 || page >= data.total_pages) {
        setHasMore(false);
      }

      setResults((prev) => [...prev, ...(data.results || [])]);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    fetchResults();
  }, [page, query]);

  // Infinite Scroll
  const lastElementRef = useRef();
  useEffect(() => {
    if (!hasMore || loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => observer.current?.disconnect();
  }, [loading, hasMore]);

  return (
    <div className={`mt-4 min-h-screen px-4 md:px-10 py-10 ${darkTheme ? "bg-black text-white" : "bg-white text-black"}`}>
      <h2 className="text-3xl font-bold mb-8 text-center">
        Showing results for <span className="text-[#29e3ad]">{query}</span>
      </h2>

      {results.length === 0 && !loading ? (
        <p className="text-center text-gray-400">No results found. Try a different search term.</p>
      ) : (
        <div className="grid gap-6 justify-center grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {results.map((item, index) => {
            const card = (
              <div className=" sm:w-full mx-auto hover:scale-[1.05] hover:shadow-xl transition-all duration-300 ">
              <ShowCard
  fullData={item}
  image={
    item.poster_path
      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
      : item.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
      : null
  }
  title={item.title || item.name}
  rating={item.vote_average?.toFixed(1)}
  releaseYear={(item.release_date || item.first_air_date || "").slice(0, 4)}
  type={item.media_type}
/>

              </div>
            );

            if (results.length === index + 1) {
              return (
                <div ref={lastElementRef} key={item.id}>
                  {card}
                </div>
              );
            }

            return <div key={item.id}>{card}</div>;
          })}
        </div>
      )}

      {loading && (
        <div className="flex justify-center mt-10">
          <img
            src="https://h5-static.aoneroom.com/oneroomStatic/public/_nuxt/web-logo.apJjVir2.svg"
            alt="Loading"
            className="w-20 h-20 opacity-80 animate-pulse"
          />
        </div>
      )}

      {!hasMore && results.length > 0 && (
        <p className="text-center py-6 text-sm text-gray-400">No more results found.</p>
      )}
    </div>
  );
}

export default Search;
