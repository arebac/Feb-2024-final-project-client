import React from "react";
import "./songCard.css";
import AlbumImage from "./AlbumImage";
import AlbumInfo from "./AlbumInfo";

const SongCard = ({ album }) => {
  return (
    <div className="songCard-body flex">
      <AlbumImage url={album?.images[0]?.url} />
      <AlbumInfo album={album} />
    </div>
  );
};

export default SongCard;
