import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import { useEffect, useState } from "react";
import SongCard from "../../components/songCard/SongCard";
import Queue from "../../components/queue/Queue";

const Player = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    apiClient.get(`playlists/${location.state?.id}/tracks`).then((res) => {
      setTracks(res.data.items);
      setCurrentTrack(res.data.items[0].track);
    });
  });

  // "https://api.spotify.com/v1/"

  return (
    <div className="screen-container flex">
      <div className="left-player-body"></div>
      <div className="right-player-body">
        <SongCard album ={currentTrack.album}/>
        <Queue />
      </div>
    </div>
  );
};

export default Player;