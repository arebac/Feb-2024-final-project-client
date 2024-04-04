import "./sidebar.css";
import SidebarButton from "./SidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import React, { useState, useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { IoSearch } from "react-icons/io5";
import { IoMusicalNotes } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { AuthContext } from "../../context/auth.context";
import { FaHome } from "react-icons/fa"

const spotifyApi = new SpotifyWebApi();

const Sidebar = () => {
  const [image, setImage] = useState(
    "https://i.pinimg.com/474x/db/c7/63/dbc7636bb173ffb38acb503d8ee44995.jpg"
  );

  const { logOutUser, user } = useContext(AuthContext);
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken"); // Directly retrieve the token
  //   if (token) {
  //     spotifyApi.setAccessToken(token);
  //     spotifyApi
  //       .getMe()
  //       .then((response) => {
  //         if (response.images && response.images.length > 0) {
  //           console.log(response.images[0].url); // Optional: logging the image URL
  //           setImage(response.images[0].url);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Failed to fetch user profile", err);
  //         // Handle error, e.g., token expired, network error, etc.
  //       });
  //   }
  // }, []);
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="sidebar-container">
      <img src={image} className="profile-img" alt="profile" />
      <div>
      <SidebarButton title="Home" to="/" icon={<FaHome />} />
        {!user && (
          <>
            <SidebarButton title="signup" to="/signup" icon={<FaUserPlus />} />
            <SidebarButton title="login" to="/login" icon={<FaSignInAlt />} />
          </>
        )}
        <SidebarButton
          title="search-track"
          to="/search-track"
          icon={<IoSearch />}
        />
        <SidebarButton
          title="user-playlist"
          to="/user-playlists"
          icon={<IoMusicalNotes />}
        />
        <SidebarButton
          title="playlists"
          to="/playlists"
          icon={<MdSpaceDashboard />}
        />
        {/* <SidebarButton
          title="playlistID"
          to="/playlists/:playlistId"
          icon={<MdSpaceDashboard />}
        /> */}
        {/* <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} /> */}

        {/* ////////      THIS ONE */}
        {/* <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton
          title="Favorites"
          to="/favorites"
          icon={<MdFavorite />}
        />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} /> */}
      </div>
      {user && (
        <SidebarButton
          title="Sign Out"
          to=""
          icon={<FaSignOutAlt />}
          logout={logOutUser}
        />
      )}
    </div>
  );
};

export default Sidebar;
