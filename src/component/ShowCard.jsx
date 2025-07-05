import { NavLink } from 'react-router-dom';

function ShowCard({ image, title, rating, releaseYear, fullData, type = "movie" }) {
  const imgUrl = image || "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <NavLink
      to={`/${type}/${fullData.id}`}
      className="relative bg-[#141414] cursor-pointer rounded-xl overflow-hidden shadow-lg hover:scale-[1.05] hover:shadow-xl transition-all duration-300 min-w-[170px] max-w-[170px]"
    >
      <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
        {releaseYear || "N/A"}
      </div>

      <img
        src={imgUrl}
        alt={title}
        className="w-full h-[250px] object-cover"
      />

      <div className="p-2 flex justify-between items-center bg-[#1f1f1f]">
        <div className="text-white text-xs font-medium truncate" title={title}>
          {title}
        </div>
        <div className="text-[#29e3ad] text-xs font-bold flex items-center gap-1">
          <span>⭐</span>
          <span>{rating || "0"}</span>
        </div>
      </div>
    </NavLink>
  );
}

export default ShowCard;
