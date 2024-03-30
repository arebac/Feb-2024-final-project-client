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
import { setClientToken } from "../spotify";
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

  const [spotifyToken, setSpotifyToken] = useState("");
  const [nowPlaying, setNowPlaying] = useState({ name: "", albumArt: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("This is what we derived form the URL: " + getTokenFromUrl);
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = "";

    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      spotifyApi.getMe().then((user) => {
        console.log(user.username);
      });
      setLoggedIn(true);
    }
  });

  const getnowPlaying = () => {
    spotifyApi.getMyCurrentPlayingTrack().then((response) => {
      console.log(response.name);
      setNowPlaying({
        name: response.item.name,
        albumArt: response.item.album.images[0].url,
      });
    });
  };
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

  return !token ? (
    <Login />
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
  );
};

export default Home;
