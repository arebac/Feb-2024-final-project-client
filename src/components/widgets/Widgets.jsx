import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./widgets.css";
import WidgetCard from "./WidgetCard";

const spotifyApi = new SpotifyWebApi();

const Widgets = ({ artistID }) => {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewReleases] = useState([]);
  const id =artistID

  console.log(similar, featured, newRelease);

  useEffect(() => {
    if (id) {
      spotifyApi
        .getArtistRelatedArtists(id)
        .then((res) => {
          const artists = res.artists.slice(0, 3);
          setSimilar(artists);
        })
        .catch((err) => console.error(err));

      spotifyApi
        .getFeaturedPlaylists()
        .then((res) => {
          const playlists = res.playlists.items.slice(0, 3);
          setFeatured(playlists);
        })
        .catch((err) => console.error(err));

      spotifyApi
        .getNewReleases()
        .then((res) => {
          const albums = res.albums.items.slice(0, 3);
          setNewReleases(albums);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  return (
    <div className="widgets-body flex">
      <WidgetCard title="Similar Artists" similar={similar} />
      <WidgetCard title="Made For You" featured={featured} />
      <WidgetCard title="New Releases" newRelease={newRelease} />
    </div>
  );
};

export default Widgets;
