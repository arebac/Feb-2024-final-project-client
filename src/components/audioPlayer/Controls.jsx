import React from "react";
import "./controls.css";
import { IconContext } from "react-icons";
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5";
import { FaPause } from "react-icons/fa";

const Controls = ({ isPlaying, setIsPlaying, handleNext, handlePrevious }) => {
  return (
    <IconContext.Provider value={{ size: "35px", color: "#C4D0E3" }}>
      <div className="controls-wrapper flex">
        <div className="action-btn flex" onClick={handlePrevious}>
          <IoPlaySkipBack />
        </div>
        <div
          className={
            isPlaying ? "play-pause-btn flex active" : "play-pause-btn flex"
          }
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <IoPlay />}
        </div>
        <div className="action-btn flex" onClick={handleNext}>
          <IoPlaySkipForward />
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Controls;
