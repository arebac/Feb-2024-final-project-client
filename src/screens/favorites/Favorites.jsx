// Favorites.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import "./favorites.css"
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";

const spotifyApi = new SpotifyWebApi();

const Favorites = () => {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    spotifyApi.getMySavedTracks().then(data => {
      setTracks(data.items);
    }).catch(err => console.error(err));
  }, []);

  const handleSongClick = (index) => {
    navigate('/player', { state: { tracks: tracks.map(item => item.track), index } });
  };

  return (
    <div className="screen-container">
      <div className="favorites-body">
        {tracks.map((item, index) => (
          <div className="song-card" 
          key={item.track.id} 
          onClick={() => handleSongClick(index)}>
          <img
            src={item.track.album.images[0].url}
            alt="Album-Art"
            className="song-image"
          />
          <p className="song-title">{item.track.name}</p>
          <p className="song-subtitle">{item.track.name} </p>
          <p className="song-subtitle">by {item.track.artists.map(artist => artist.name).join(", ")}</p>
          <div className="song-fade">
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;