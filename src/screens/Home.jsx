import React from "react";

import { Routes, Route } from "react-router-dom";
import Feed from "./Feed";
import Trending from "./Trending";
import Library from "./library/Library";
import Player from "./player/Player";
import Favorites from "./Favorites";
import Sidebar from "../components/sidebar/Sidebar";
import Login from "../auth/Login";
import { useState, useEffect } from "react";
// import { setClientToken } from "../spotify";
import SpotifyWebApi from "spotify-web-api-js";

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
    // This logs the entire object obtained from the URL. Adjusted to log only the token.
    const { access_token: spotifyToken } = getTokenFromUrl();
    console.log("Token obtained from URL:", spotifyToken);
    window.location.hash = ""; // Clear the URL fragment for security

    if (spotifyToken) {
      setLoggedIn(true);
      spotifyApi.setAccessToken(spotifyToken); // Set the token for Spotify API client

      // Fetch and log the user's Spotify username as a test
      spotifyApi.getMe().then((user) => {
        console.log("Spotify username:", user.display_name);
      });
    }
  }, []);



  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const hash = window.location.hash;
  //   window.location.hash = "";

  //   if (!token && hash) {
  //     const _token = hash.split("&")[0].split("=")[1];
  //     window.localStorage.setItem("token", _token);
  //     setToken(_token);
  //     setClientToken(_token);
  //   } else {
  //     setToken(token);
  //     setClientToken(token);
  //   }
  // }, []);

  //   return !token ? (
  //     <Login />
  //   ) : (
  //     <div className="main-body">
  //       <Sidebar />
  //       <Routes>
  //         <Route path="/" element={<Library />} />
  //         <Route path="/feed" element={<Feed />} />
  //         <Route path="/trending" element={<Trending />} />
  //         <Route path="/player" element={<Player />} />
  //         <Route path="/favorites" element={<Favorites />} />
  //       </Routes>
  //     </div>
  //   );
  // };

  return (
    <>
      {!loggedIn ? (
      <Login/>
      ) : (
        <div className="main-body">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/player" element={<Player />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      )}
    </>
  );
};
export default Home;
