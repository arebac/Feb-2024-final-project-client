import React, { useState, useEffect } from "react";
import "./library.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "../../auth/Login";

const spotifyApi = new SpotifyWebApi();


const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    spotifyApi.getUserPlaylists().then(
      function (data) {
        console.log("Retrieved playlists", data.items);
        setPlaylists(data.items);
      },
      function (err) {
        console.error(err);
      }
    );
  }, []);

  const playPlaylist = (id) => {
    console.log(id);
    navigate("/player", { state: { id: id } });
  };

  return (
    <div className="screen-container">
      <div className="library-body">
        {playlists?.map((playlist) => (
          <div
            className="playlist-card"
            key={playlist.id}
            onClick={() => playPlaylist(playlist.id)}
          >
            <img
              src={playlist.images[0].url}
              alt="Playlist-Art"
              className="playlist-image"
            />
            <p className="playlist-title">{playlist.name}</p>
            <p className="playlist-subtitle">{playlist.tracks.length} Songs</p>
            <div className="playlist-fade">
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

export default Library;
