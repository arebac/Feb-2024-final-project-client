import "./player.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SongCard from "../../components/songCard/SongCard";
import Queue from "../../components/queue/Queue";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();
const Player = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});

  useEffect(() => {
    const playlistId = location.state?.id;
    if (playlistId) {
      spotifyApi.getPlaylistTracks(playlistId).then(
        (data) => {
          const items = data.items;
          setTracks(items);
          if (items.length > 0) {
            setCurrentTrack(items[0].track);
          }
        },
        (err) => {
          console.error("Something went wrong when fetching the playlist tracks", err);
        }
      );
    }
  }, [location.state?.id]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">

      </div>
      <div className="right-player-body">
        {currentTrack && currentTrack.album && (
          <SongCard album={currentTrack.album} />
        )}
        <Queue tracks={tracks.map(track => track.track)} /> 
      </div>
    </div>
  );
};

export default Player;