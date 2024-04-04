import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlaylistContext } from "../context/playlists.context";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../context/auth.context";
import { axiosDelete } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../services/SERVER_URL";
import { post } from "../services/authService";
function PlaylistDetails() {
  const [playlist, setPlaylist] = useState(null);
  const [review, setReview] = useState({ comment: "", rating: "" });
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { allPlaylist, playlists } = useContext(PlaylistContext);

  const handleDelete = async (playlistId) => {
    try {
      await axiosDelete("/playlist/" + playlistId);
      navigate("/user-playlists");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post("/reviews/" + playlistId, {
        comment: review.comment,
        rating: review.rating,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allPlaylist &&
      setPlaylist(
        allPlaylist.find((playlist) => playlist._id.toString() === playlistId)
      );
  }, [playlistId]);

  useEffect(() => {
    console.log(playlist);
  }, [playlist]);

  return (
    <div className="screen-container">
      <div>
        PlaylistDetails
        {playlist && (
          <>
            <h2>{playlist.name}</h2>
            {playlist.tracks.map((track) => (
              <div className="song-card" key={track.track.id}>
                <img
                  src={track.track.image}
                  alt="Album Art"
                  className="song-image"
                />
                <p>{track.track.name}</p>
                <p className="song-subtitle">by {track.track.artist}</p>
                <div className="song-fade">
                  <IconContext.Provider
                    value={{ size: "50px", color: "#E99D72" }}
                  >
                    <FaPlus />
                  </IconContext.Provider>
                </div>
              </div>
            ))}
            {playlist.owner.toString() === user._id && (
              <button onClick={() => handleDelete(playlist._id)}>
                delete playlist
              </button>
            )}
          </>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="review"> Liked my playlist? Leave a review </label>
        <input
          type="text"
          name="review"
          onChange={(e) =>
            setReview((prev) => ({ ...prev, comment: e.target.value }))
          }
        />

        <button>Submit review</button>
      </form>
    </div>
  );
}

export default PlaylistDetails;
