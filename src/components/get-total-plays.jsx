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
      <h1>Ouviste <br />{totalPlays} musicas.</h1>
    </div>
  );
};

export default GetTotalPlays;
