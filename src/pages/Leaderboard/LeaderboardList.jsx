import React from "react";

const LeaderboardList = ({ players }) => {
  return (
    <>
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
    </>
  );
};

export default LeaderboardList;
