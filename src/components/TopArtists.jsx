import React, { useEffect, useState } from "react";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    fetch("/history.json")
      .then((res) => res.json())
      .then((data) => {
        // Use a Map to count plays per artist
        const artistMap = new Map();
        data.forEach((entry) => {
          const artist = entry.master_metadata_album_artist_name;
          if (artist) {
            artistMap.set(artist, (artistMap.get(artist) || 0) + 1);
          }
        });
        // Convert to array and sort
        const sorted = Array.from(artistMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 100);
        setTopArtists(sorted);
      });
  }, []);

  return (
    <div>
      <h2></h2>
      <ol>
        {topArtists.map(([artist, count]) => (
          <li key={artist}>
            {artist} — {count} plays
          </li>
        ))}
      </ol>
    </div>
  );
};


export default TopArtists;
