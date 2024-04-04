import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlaylistContext } from "../context/playlists.context";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../context/auth.context";
import { axiosDelete } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../services/SERVER_URL";
import { post, get } from "../services/authService";
import { returnRelativeTime } from "../services/time";
import "../shared/yourPlaylists.css";

function PlaylistDetails() {
  const [playlist, setPlaylist] = useState(null);
  const [addingReview, setAddingReview] = useState(false);
  const [review, setReview] = useState({ comment: "", rating: "" });
  const [theseReviews, setTheseReviews] = useState([])
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

  const getReviews = () => {

    get(`/reviews/${playlistId}`)
      .then((response) => {
        console.log("these are the reviews ===>", response.data)
        setTheseReviews(response.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post("/reviews/" + playlistId, {
        comment: review.comment,
        rating: review.rating,
      });

      console.log("This is the review response", response.data)

      if (response) {
        setAddingReview(false)
        getReviews()
      }

      console.log(response);
    } catch (error) {
      console.log("Error adding review", error);
    }
  };


  useEffect(() => {
    allPlaylist &&
      setPlaylist(
        allPlaylist.find((playlist) => playlist._id.toString() === playlistId)
      );
     getReviews()   
  
  }, [playlistId, allPlaylist]);

  useEffect(() => {
    console.log(playlist);
  }, [playlist]);

  return (
    <div className="screen-container">
      <div className="library-body">
        <h3>Playlist Details:</h3>
        {playlist && (
          <>
            <h2>Name: {playlist.name}</h2>
            {playlist.tracks.map((track) => (
              <div className="playlist-card" key={track.track.id}>
                <img
                  src={track.track.image}
                  alt="Album Art"
                  className="playlist-image"
                />
                <p className="playlist-title">{track.track.name}</p>
                <p className="playlist-subtitle">by {track.track.artist}</p>
                <div className="playlist-fade"></div>
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

      {
        !addingReview &&

        <button onClick={() => {setAddingReview(true)}}>Add Review</button>

      }


      {
        addingReview &&

        <div>

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
              <button onClick={() => setAddingReview(false)}>Cancel</button>
        </div>

      }

      {
        theseReviews.length > 0 &&

        <div>
          {
            theseReviews.map((review) => {
              return (
                <div>
                  <p>{review.comment} - {review.user.name}</p>
                  <p>{returnRelativeTime(review.createdAt)}</p>
                </div>
              )
            }).reverse()
          }
        </div>
      }

    </div>
  );
}

export default PlaylistDetails;
