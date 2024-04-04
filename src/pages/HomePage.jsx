import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { SERVER_URL } from "../services/SERVER_URL";
import { Link } from "react-router-dom";
import "../screens/library/library.css"




function HomePage() {
  const [allPlaylists, setAllPlaylists] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);



  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlists = await axios.get(SERVER_URL + "/playlist/all");

        setAllPlaylists(playlists.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaylists();
  }, []);

  useEffect(() => {
    console.log(allPlaylists);
  }, [allPlaylists]);
  return (
    <div className="screen-container"> 
      <div className="library-body">
      <h3 className="page-header">Browse through our amazirful playlists:</h3>

  {allPlaylists &&
    allPlaylists.map((playlist) => (
      <Link to={`/playlists/${playlist._id}`} className="playlist-card">
          <img
            src={playlist?.tracks[0]?.track?.image}
            alt="Playlist-Art"
            className="playlist-image"
          />
          <p className="playlist-title">{playlist.name}</p>
          <p className="playlist-subtitle">{playlist.tracks.length} Songs</p>
      </Link>
    ))}
</div>

    </div>
  );
}
export default HomePage;
