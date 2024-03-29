import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import "./library.css";

const Library = () => {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    APIKit.get("me/playlists").then(function (response) {
      setPlaylists(response.data.items);
      console.log(response.data.items);
    });
  }, []);

  return (
    <div className="screen-container">
      <div className="library-body">
        {playlists?.map((playlist) => (
          <div className="playlist-card">
            <img
              src={playlist.images[0].url}
              alt="Playlist-Art"
              className="playlist-image"
            />
            <p className="playlist-title">{playlist.name}</p>
            <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
