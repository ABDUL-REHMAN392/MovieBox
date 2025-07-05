import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Backdrop, PosterInfo, Companies, Cast, Recommended, SkeletonSinglePage, ErrorMessage } from "../component";

function SinglePage() {
  const { type, id } = useParams();
 const { darkTheme } = useSelector((state) => state.conditions);
  const recRef = useRef(null);

  const [data, setData] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        };

        const [detailsRes, castRes, videoRes, recRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, { headers }),
          fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`, { headers }),
          fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`, { headers }),
          fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1`, { headers }),
        ]);

        if (!detailsRes.ok || !castRes.ok || !videoRes.ok || !recRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const json = await detailsRes.json();
        const castData = await castRes.json();
        const videoData = await videoRes.json();
        const recData = await recRes.json();

        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        setData(json);
        setCast(castData.cast?.slice(0, 6) || []);
     const trailerVideo = videoData.results?.find(v => v.type === "Trailer");
setTrailer(trailerVideo ? (trailerVideo.url || `https://www.youtube.com/watch?v=${trailerVideo.key}`) : null);

        setRecommended(recData.results || []);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [type, id]);

  if (loading) return <SkeletonSinglePage darkTheme={darkTheme} />;
  if (error) return <ErrorMessage message={`Error loading ${type}/${id}`} />;
  if (!data) return <ErrorMessage message={`No data found for ${type}/${id}`} />;

  return (
    <div className={`mt-10 ${darkTheme ? "bg-black text-white" : "bg-white text-black"} min-h-screen relative overflow-hidden px-6 py-10`}>
      <Backdrop backdropPath={data.backdrop_path} darkTheme={darkTheme} />

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        <PosterInfo data={data} trailer={trailer} darkTheme={darkTheme} />
        <Companies companies={data.production_companies} darkTheme={darkTheme} />
        <Cast cast={cast} darkTheme={darkTheme} />
        <Recommended recommended={recommended} recRef={recRef} darkTheme={darkTheme} type={type} />
      </div>
    </div>
  );
}

export default SinglePage;
