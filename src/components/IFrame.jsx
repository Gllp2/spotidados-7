import React, { useEffect, useState } from "react";
import "../styles/IFrame.css";

const DATE_LIMITS = {
  "4w": 1000 * 60 * 60 * 24 * 7 * 4,
  "6m": 1000 * 60 * 60 * 24 * 30 * 6,
  "1y": 1000 * 60 * 60 * 24 * 365,
  all: Infinity,
};

const SEASON_THEMES = {
  all: { bg: "#222", text: "#fff" },
  winter: { bg: "#e0f7fa", text: "#33a2b8" },
  summer: { bg: "#fff9c4", text: "#d4de18" },
  autumn: { bg: "#efebe9", text: "#e65700" },
  spring: { bg: "#fce4ec", text: "#2e7d32" },
};

const IFrame = () => {
  const [data, setData] = useState([]);
  const [topMusics, setTopMusics] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [musicArtistMap, setMusicArtistMap] = useState(new Map());
  const [showMusics, setShowMusics] = useState(true);
  const [timeFilter, setTimeFilter] = useState("all");
  const [season, setSeason] = useState("all"); // Default to "all" for All Seasons

  useEffect(() => {
    fetch("/history.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  useEffect(() => {
    const now = new Date("2023-12-18T17:33:32Z");
    const cutoff = new Date(now - DATE_LIMITS[timeFilter]);

    const musicMap = new Map();
    const artistMap = new Map();
    const artistLookup = new Map();

    data.forEach((entry) => {
      const time = new Date(entry.ts);
      if (time < cutoff) return;

      // Only filter by season if not "all"
      if (season !== "all") {
        const month = time.getUTCMonth(); // 0 = Jan, 11 = Dec
        let seasonMatch = false;
        if (season === "winter" && (month === 11 || month === 0 || month === 1))
          seasonMatch = true;
        if (season === "spring" && month >= 2 && month <= 4) seasonMatch = true;
        if (season === "summer" && month >= 5 && month <= 7) seasonMatch = true;
        if (season === "autumn" && month >= 8 && month <= 10)
          seasonMatch = true;
        if (!seasonMatch) return;
      }

      const track = entry.master_metadata_track_name;
      const artist = entry.master_metadata_album_artist_name;

      if (track && artist) {
        musicMap.set(track, (musicMap.get(track) || 0) + 1);
        artistMap.set(artist, (artistMap.get(artist) || 0) + 1);
        artistLookup.set(track, artist);
      }
    });

    const sortedMusics = Array.from(musicMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100);
    const sortedArtists = Array.from(artistMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100);

    setTopMusics(sortedMusics);
    setTopArtists(sortedArtists);
    setMusicArtistMap(artistLookup);
  }, [data, timeFilter, season]);

  const theme = SEASON_THEMES[season];

  return (
    <div
      className="iframe-wrapper"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <div className="iframe-header">
        <div className="toggle-buttons">
          <button
            className={showMusics ? "active" : ""}
            onClick={() => setShowMusics(true)}
          >
            🎵
          </button>
          <button
            className={!showMusics ? "active" : ""}
            onClick={() => setShowMusics(false)}
          >
            👤
          </button>
        </div>
        <div className="filter-buttons">
          <select
            className="time-select"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="4w">Last 4 Weeks</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
            <option value="all">All Time</option>
          </select>
          <select
            className="season-select"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="all">All Seasons</option>
            <option value="winter">❄️ Winter</option>
            <option value="spring">🌸 Spring</option>
            <option value="summer">☀️ Summer</option>
            <option value="autumn">🍂 Autumn</option>
          </select>
        </div>
      </div>

      <div className="list-container">
        <div className="list-header">
          <span> </span>
          <span className="header-right">Plays</span>
        </div>
        <div className="list-toggle">
          <ul className="item-list">
            {(showMusics ? topMusics : topArtists).map(([name, count]) => {
              const sub = showMusics
                ? musicArtistMap.get(name)
                : Array.from(musicArtistMap.entries()).find(
                    ([_, artist]) => artist === name
                  )?.[0] || "—";

              return (
                <li key={name} className="list-item">
                  <div className="item-text">
                    <div className="main-text">{name}</div>
                    <div className="sub-text">{sub}</div>
                  </div>
                  <div className="item-count">{count}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IFrame;
