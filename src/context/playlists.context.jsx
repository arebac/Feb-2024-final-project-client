import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth.context";
import { useNavigate } from "react-router-dom";
import { get, post, put, axiosDelete } from "../services/authService";
import { SERVER_URL } from "../services/SERVER_URL";
import axios from "axios";
const PlaylistContext = createContext();

function PlaylistProvider({ children }) {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState(null);
  const [allPlaylist, setAllPlaylists] = useState(null);

  const { user } = useContext(AuthContext);

  // const fetchAllPlaylists = async () => {
  //   try {
  //     const response = await axios.get(SERVER_URL + "/playlist/id");
  //     console.log("response get all PL", response);
  //     setAllPlaylists(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchAllPlaylists = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/playlist/all");
      console.log("response get all PL", response);
      setAllPlaylists(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPlaylist = async (e, name, setName) => {
    e.preventDefault();
    try {
      const response = await post("/playlist", { name: name });

      if (response.status === 201) {
        setPlaylists((prev) => [...prev, response.data]);
      }
      setName("");
      fetchAllPlaylists()
    } catch (error) {
      console.log(error);
    }
  };

  const updatePlaylist = async (playlistId, tracks) => {
    try {
      const response = await put(`/playlist/${playlistId}`, { tracks: tracks });
      if (response.status === 200) {
        setPlaylists((prev) => [...prev, response.data]);
      }
      fetchAllPlaylists()
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlaylist = async (playlistId) => {
    try {
      const response = await axiosDelete(`/playlist/${playlistId}`);

      if (response.status === 200) {
        setPlaylists((prev) =>
          prev.filter((playlist) => playlist._id !== playlistId)
        );
      }
      fetchAllPlaylists()
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("playlists 🎵", playlists);
  }, [playlists]);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setPlaylists(null);
        navigate("/login");
      }
      try {
        const response = await get("/playlist");

        setPlaylists(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    user && fetchUserPlaylists();
  }, [user]);

  useEffect(() => {
    fetchAllPlaylists();
  }, []);

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        updatePlaylist,
        deletePlaylist,
        createPlaylist,
        fetchAllPlaylists,
        allPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export { PlaylistContext, PlaylistProvider };
