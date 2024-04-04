import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { SERVER_URL } from "../services/SERVER_URL";
import { Link } from "react-router-dom";
function HomePage() {
  const [allPlaylists, setAllPlaylists] = useState(null);

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
    <div className="screen-container ">
      <div>
        <h1>Browse through our amazirful playlists</h1>
      </div>

      <div className="">
        {allPlaylists &&
          allPlaylists.map((playlist) => (
              <Link to={`/playlists/${playlist._id}`}>
            <div className="playlist-card">
                <h3>{playlist.name}</h3>
            </div>
              </Link>
          ))}
      </div>
    </div>
  );
}
export default HomePage;
