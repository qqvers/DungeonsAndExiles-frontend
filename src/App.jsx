import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Character from "./pages/Character/Character";
import Profile from "./pages/Profile/Profile";
import Dungeons from "./pages/Dungeons/Dungeons";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative h-[1080px] w-[1920px]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character" element={<Character />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dungeons" element={<Dungeons />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
