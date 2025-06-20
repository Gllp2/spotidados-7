import React, { useEffect, useState } from "react";

const GetTotalPlays = () => {
  const [totalPlays, setTotalPlays] = useState(0);

  useEffect(() => {
    fetch("/history.json")
      .then((response) => response.json())
      .then((data) => {
        setTotalPlays(data.length);
      });
  }, []);

  return (
    <div>
      <h3>Ouviste {totalPlays} musicas.</h3>
    </div>
  );
};

export default GetTotalPlays;
