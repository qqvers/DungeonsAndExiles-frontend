import React from "react";

const MonsterList = ({ monsters, cooldown, handleAttack }) => {
  return (
    <>
      {monsters.map((monster) => (
        <div
          key={monster.id}
          className="customShadow mb-8 grid h-96 w-64 cursor-default justify-center rounded-lg bg-black/50 backdrop-blur-lg"
        >
          <div className="mt-12">
            <h1 className="w-[200px] text-2xl">{monster.name}</h1>
            {monster.image && (
              <img
                src={`data:image/jpeg;base64,${monster.image}`}
                alt={monster.name}
                className="m-auto h-[66px] w-[84px]"
              />
            )}
            <div className="pt-8">
              <p className="text-sm">level: {monster.level}</p>
              <p className="text-sm">health: {monster.health}</p>
              <p className="text-sm">damage: {monster.damage}</p>
              <p className="text-sm">defence: {monster.defence}</p>
            </div>
          </div>
          <button
            className={`m-auto h-8 w-24 rounded-md border-2 bg-black ${
              !cooldown
                ? "border-red-500 text-red-500 hover:border-red-600 hover:text-red-600"
                : "cursor-not-allowed border-gray-500 text-gray-500"
            }`}
            onClick={() => handleAttack(monster)}
            disabled={cooldown}
          >
            Attack!
          </button>
        </div>
      ))}
    </>
  );
};

export default MonsterList;
