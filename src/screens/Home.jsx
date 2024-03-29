import React from "react";

import { Routes, Route } from "react-router-dom";
import Feed from "./Feed";
import Trending from "./Trending";
import Library from "./library/Library";
import Player from "./Player";
import Favorites from "./Favorites";
import Sidebar from "../components/sidebar/Sidebar";
import Login from "../auth/Login";
import { useState, useEffect } from "react";
import { setClientToken } from "../spotify";

const Home = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";

    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

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
