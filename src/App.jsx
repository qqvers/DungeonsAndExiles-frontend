import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Character from "./pages/Character/Character";
import Profile from "./pages/Profile/Profile";
import Dungeons from "./pages/Dungeons/Dungeons";
import Ranking from "./pages/Ranking/Ranking";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character" element={<Character />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dungeons" element={<Dungeons />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
