import React, { useEffect, useState } from "react";

const TopMusics = () => {
  const [topMusics, setTopMusics] = useState([]);

  useEffect(() => {
	fetch("/history.json")
	  .then((res) => res.json())
	  .then((data) => {
		
		const musicMap = new Map();
		data.forEach((entry) => {
		  const music = entry.master_metadata_track_name;
		  if (music) {
			musicMap.set(music, (musicMap.get(music) || 0) + 1);
		  }
		});
		
		const sorted = Array.from(musicMap.entries())
		  .sort((a, b) => b[1] - a[1])
		  .slice(0, 100);
		setTopMusics(sorted);
	  });
  }, []);

  return (
	<div>
	  <h2></h2>
	  <ol>
		{topMusics.map(([music, count]) => (
		  <li key={music}>
			{music} — {count} plays
		  </li>
		))}
	  </ol>
	</div>
  );
};

export default TopMusics;
