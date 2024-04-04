import { useContext, useState } from "react";
import { PlaylistContext } from "../context/playlists.context";
import { Link } from "react-router-dom";

function Playlists() {
  const { playlists, createPlaylist, deletePlaylist } =
    useContext(PlaylistContext);
  const [name, setName] = useState("");

  return (
    <div className="screen-container">
      <div>
        <h1>Your Playlists:</h1>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <form onSubmit={(e) => createPlaylist(e, name, setName)}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create Playlist
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label htmlFor="playlistName">Playlist name: </label>
                  <input
                    name="playlistName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                    Create!
                  </button>
                </div>
              </div>
            </div>{" "}
          </form>
        </div>
        {playlists && playlists.length ? (
          <div>
            {playlists.map((playlist) => (
              <div className="playlist-card">
                <Link to={`/playlists/${playlist._id}`}>
                  <h3>{playlist.name}</h3>
                </Link>
                <button onClick={() => deletePlaylist(playlist._id)}>🗑️</button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <h2>You don't have any playlists ☹️</h2>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Create one now!
            </button>
          </>
        )}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create a playlist!
        </button>
      </div>
    </div>
  );
}

export default Playlists;
