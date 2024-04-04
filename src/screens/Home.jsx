import React from "react";

import { Routes, Route } from "react-router-dom";
import Feed from "./Feed";
import Trending from "./Trending";
import Library from "./library/Library";
import Player from "./player/Player";

import Sidebar from "../components/sidebar/Sidebar";
import Login from "../auth/Login";
import { useState, useEffect } from "react";
// import { setClientToken } from "../spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Favorites from "./favorites/Favorites";
import SearchTrack from "../pages/SearchTrack";
import Playlists from "../pages/Playlists";
import SignupPage from "../pages/SignupPage";
import PlaylistDetails from "../pages/PlaylistDetails";
import AllPlaylists from "../pages/AllPlaylists";
import LoginPage from "../pages/LoginPage";

const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({ name: "", albumArt: "" });

  useEffect(() => {
    const { access_token: spotifyToken } = getTokenFromUrl();
    console.log("Token obtained from URL:", spotifyToken);
    window.location.hash = ""; 

    if (spotifyToken) {
      setLoggedIn(true);
      spotifyApi.setAccessToken(spotifyToken); 

      spotifyApi.getMe().then((user) => {
        console.log("Spotify username:", user.display_name);
      });
    }
  }, []);


  return (
    <>
      {!loggedIn ? (
      <Login/>
      ) : (
        <div className="main-body">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Library />} />
            {/* <Route path="/feed" element={<Feed />} />
            <Route path="/trending" element={<Trending />} /> */}
            <Route path="/player" element={<Player />} />
            <Route path="/search-track" element={<SearchTrack />} />
            <Route path="/user-playlists" element={<Playlists />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/playlists/:playlistId"element={<PlaylistDetails />} />
            <Route path="/playlists" element={<AllPlaylists />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      )}
    </>
  );
};
export default Home;
