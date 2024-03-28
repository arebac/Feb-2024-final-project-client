import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./Feed";
import Trending from "./Trending";
import Library from "./Library";
import Player from "./Player";
import Favorites from "./Favorites";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="main-body">
    <Sidebar/>
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
