import React, { useEffect, useState } from "react";

const GetTotalTime = () => {
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    fetch("/history.json")
      .then((response) => response.json())
      .then((data) => {
        const totalMs = data.reduce(
          (sum, item) => sum + (item.ms_played || 0),
          0
        );
        setTotalMinutes(totalMs / (1000 * 60));
        setTotalHours(totalMs / (1000 * 60 * 60));
      });
  }, []);

  return (
    <div>
      <p>Total ms_played in hours: {totalHours.toFixed(2)} hours</p>
      <p>Total ms_played in minutes: {totalMinutes.toFixed(2)} minutes</p>
    </div>
  );
};

export default GetTotalTime;
