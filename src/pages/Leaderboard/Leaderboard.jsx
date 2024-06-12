import React, { useState, useEffect } from "react";
import fnFetchWithAuth from "../../api/fnFetchWithAuth";
import ErrorPage from "../ErrorPage/ErrorPage";
import LeaderboardList from "./LeaderboardList";
const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const isAuthenticated = localStorage.getItem("access_token") !== null;
  const fetchData = async () => {
    try {
      const response = await fnFetchWithAuth("/players");
      if (response.ok) {
        const data = await response.json();
        setPlayers(data.sort((a, b) => b.level - a.level));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isAuthenticated ? (
    <div className="flex h-[800px] w-fit flex-col justify-center pt-36 2xl:w-full 2xl:items-center">
      <div className="customShadow z-10 mb-[600px] ml-6 rounded-md bg-black p-2 text-3xl font-bold text-yellow-500">
        <span className="cursor-default">Leaderboard</span>
      </div>
      <LeaderboardList players={players} />
    </div>
  ) : (
    <ErrorPage />
  );
};

export default Leaderboard;
