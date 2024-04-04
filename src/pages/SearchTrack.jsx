import { useState, useEffect, useContext } from "react";
import { SERVER_URL } from "../services/SERVER_URL";
import axios from "axios";
import "../screens/favorites/favorites.css";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa";
import { PlaylistContext } from "../context/playlists.context";
import Select from "react-select";
import { put } from "../services/authService";

function SearchTrack() {
  const [query, setQuery] = useState(""); // Initialize state with an empty string for controlled input
  const [results, setResults] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const { playlists } = useContext(PlaylistContext);

  const handleAddToPlaylist = async (e) => {
    e.preventDefault();
    console.log(currentSong);
    console.log(currentPlaylist);

    try {
      const response = await put("/playlist/" + currentPlaylist._id, {track: {name: currentSong.name,
            artist: currentSong.artists[0].name,
            duration_ms: currentSong.duration_ms,
            id: currentSong.id,
            image: currentSong.album.images[0].url}
        
          
            
          },
        
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(SERVER_URL + "/spotify/search", {
        query: query,
      });
      console.log(response.data);

      setResults(response.data.tracks.items);
    } catch (error) {
      console.error(error);
      setResults(null);
    }
  };

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div className="screen-container ">
      <form
        onSubmit={handleSubmit}
        className="w-full d-flex align-items-center justify-content"
      >
        <div className="" />
        <input
          type="text"
          name="searchInput"
          placeholder="Search for songs"
          value={query} // Controlled input must have its value tied to component state
          onChange={(e) => setQuery(e.target.value)} // Update state based on input
          className="" // Ensure input grows within form, added ml-4 for spacing
        />
        <button type="submit" className="ml-4">
          Search!
        </button>{" "}
        {/* Added spacing */}
      </form>

      <div className="favorites-body">
        {results &&
          results.map((track) => (
            <div
              className="song-card"
              key={track.id}
              data-bs-target="#exampleModal"
              data-bs-toggle="modal"
              onClick={() => setCurrentSong(track)}
            >
              <img
                src={track.album.images[0].url}
                alt="Album-Art"
                className="song-image"
              />
              <p className="">{track.name}</p>
              <p className="song-subtitle">
                by {track.artists.map((artist) => artist.name).join(", ")}
              </p>
              <div className="song-fade">
                <IconContext.Provider
                  value={{ size: "50px", color: "#E99D72" }}
                >
                  <FaPlus />
                </IconContext.Provider>
              </div>
            </div>
          ))}

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <form onSubmit={(e) => handleAddToPlaylist(e)}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add {currentSong && currentSong.name} to a playlist
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label htmlFor="playlistName">Select playlist</label>
                  {playlists && (
                    <Select
                      onChange={(e) => setCurrentPlaylist(e.value)}
                      options={playlists.map((playlist) => ({
                        value: playlist,
                        label: playlist.name,
                      }))}
                    />
                  )}

                  {/* <input
                    name="playlistName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  /> */}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Add!
                  </button>
                </div>
              </div>
            </div>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchTrack;
