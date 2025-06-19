import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import TopArtists from './components/TopArtists';
import TopMusics from './components/TopMusics';
import GetTotalTime from './components/get-total-time';
import IFrame from './components/IFrame';
import GetTotalPlays from './components/get-total-plays';
import MedianDailyHours from './components/median'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/IFrame" element={<IFrame />} />
        <Route path="/top-artists" element={<TopArtists />} />
        <Route path="/top-musics" element={<TopMusics />} />
        <Route path="/total-time" element={<GetTotalTime />} />
        <Route path="/total-plays" element={<GetTotalPlays />} />
        <Route path="/median-daily-hours" element={<MedianDailyHours />} />
      </Routes>
    </Router>
  );
}

export default App;
