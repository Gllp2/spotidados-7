import React, { useEffect, useState } from "react";

// Helper to calculate median
function median(values) {
  if (!values.length) return 0;
  values.sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);
  if (values.length % 2 === 0) {
    return (values[mid - 1] + values[mid]) / 2;
  }
  return values[mid];
}

export default function MedianDailyMinutes() {
  const [medianMinutes, setMedianMinutes] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/history.json")
      .then((res) => res.json())
      .then((data) => {
        // Only consider entries before or at 2023-12-18T17:33:32Z
        const cutoff = new Date("2023-12-18T17:33:32Z");
        // Group ms_played by day
        const daily = {};
        data.forEach((entry) => {
          const ts = new Date(entry.ts);
          if (ts > cutoff) return;
          // Only count music, not podcasts
          if (entry.master_metadata_track_name) {
            const day = ts.toISOString().slice(0, 10);
            daily[day] = (daily[day] || 0) + (entry.ms_played || 0);
          }
        });
        // Convert ms to minutes for each day
        const minutes = Object.values(daily).map((ms) => ms / 1000 / 60);
        setMedianMinutes(median(minutes));
      });
  }, []);

  return (
    <div>
      <h4>Cerca de <br /></h4>
      {medianMinutes === null ? (
        <p></p>
      ) : (
        <h4>
          {medianMinutes.toFixed(0)} <br /> minutos por dia
        </h4>
      )}
    </div>
  );
}