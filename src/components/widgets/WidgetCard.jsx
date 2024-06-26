import React from "react";
import "./widgetCard.css";
import WidgetEntry from "./WidgetEntry";
import { IconContext } from "react-icons";
import {FiChevronRight} from "react-icons/fi"
const WidgetCard = ({ title, similar, featured, newRelease }) => {
  return (
    <div className="widgetcard-body">
      <p className="widget-title">{title}</p>
      {similar
        ? similar.map((artist) => (
            <WidgetEntry
              title={artist?.name}
              subtitle={artist?.followers?.total + " Followers"}
              image={artist?.images[2]?.url}
            />
          ))
        : featured
        ? featured.map((playlist) => (
            <WidgetEntry
              title={playlist?.name}
              subtitle={playlist?.tracks?.total + " Songs"}
              image={playlist?.images[0]?.url}
            />
          ))
        : newRelease
        ? newRelease.map((album) => (
            <WidgetEntry
              title={album?.name}
              subtitle={album?.tracks?.total}
              image={album?.images[2]?.url}
            />
          ))
        : null}
        <div className="widget-fade">
          <div className="fade-button">
            <IconContext.Provider value={{ size: "24px", color: "#E99D72" }}>
              <FiChevronRight />
            </IconContext.Provider>
          </div>
        </div>
    </div>
  );
};

export default WidgetCard;
