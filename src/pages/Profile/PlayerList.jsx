import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router";
import fnFetchWithAuth from "../../api/fnFetchWithAuth";

const PlayerList = ({ players, fetchData }) => {
  const navigate = useNavigate();
  const handleSelectPlayer = (player) => {
    localStorage.setItem("selectedPlayerId", player.id);
    localStorage.setItem("player", JSON.stringify(player));
    navigate("/character");
  };
  const handleDeletePlayer = async (playerId) => {
    try {
      const response = await fnFetchWithAuth(`/players/${playerId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchData();
      } else {
        console.error("Failed to delete player", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      {players.map((player) => (
        <div
          key={player.id}
          className="relative mx-[10px] mb-4 flex h-[120px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-gray-800 text-white hover:bg-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => handleSelectPlayer(player)}
        >
          <RiDeleteBin6Line
            size={20}
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black p-1 text-red-500 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePlayer(player.id);
            }}
          />
          <span>Name: {player.name}</span>
          <span>Level: {player.level}</span>
        </div>
      ))}
    </>
  );
};

export default PlayerList;
