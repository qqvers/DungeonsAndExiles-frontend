import React, { useState, useEffect } from "react";
import fnFetchWithAuth from "../../api/fnFetchWithAuth";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);

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

  return (
    <div className="flex h-[800px] w-fit flex-col justify-center pt-36 2xl:w-full 2xl:items-center">
      <div className="customShadow z-10 mb-[600px] ml-6 rounded-md bg-black p-2 text-3xl font-bold text-yellow-500">
        <span className="cursor-default">Leaderboard</span>
      </div>
      <div className="customShadow scroll-y-visible scrolling-auto absolute mt-24 flex h-[700px] w-[500px] max-w-2xl flex-col overflow-y-scroll rounded-lg bg-black/90 p-6 pt-16 shadow-md 2xl:w-full">
        {players.map((player, index) => (
          <div
            className="mb-4 flex items-center justify-between rounded border-2 border-yellow-600 bg-black p-4 text-white shadow-sm hover:bg-gray-900"
            key={player.id}
          >
            <span className="cursor-default text-lg font-semibold">
              {index + 1}. {player.name}
            </span>
            <span
              className={`cursor-default rounded bg-yellow-600 px-3 py-1 text-white`}
            >
              Level: {player.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
