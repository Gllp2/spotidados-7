import React from 'react';
import { Link } from 'react-router-dom';
import GetTotalTime from '../components/get-total-time';
import IFrame from '../components/IFrame';
import MedianDailyHours from '../components/median';
import arrow from '../styles/images/arrow.png';
import GetTotalPlays from '../components/get-total-plays';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">

      {/* Total Hours Block */}
      <div className="info-block red-block">
        <div className="info-text">
          <GetTotalTime />
        </div>
        <Link to="#">
          <img src={arrow} alt="arrow" className="arrow-icon" />
        </Link>
      </div>

      {/* Minutes Per Day Block */}
      <div className="info-block blue-block">
        <div className="info-text">
          <MedianDailyHours />
        </div>
        <Link to="#">
          <img src={arrow} alt="arrow" className="arrow-icon" />
        </Link>
      </div>

      {/* Total Plays */}
      <div className="info-block yellow-block">
        <div className="info-text">
        <GetTotalPlays />
        </div>
        <Link to="#">
          <img src={arrow} alt="arrow" className="arrow-icon" />
        </Link>
      </div>

      {/* Embedded IFrame */}
      <div className="iframe-box">
        <IFrame />
      </div>
    </div>
  );
}

export default Home;
