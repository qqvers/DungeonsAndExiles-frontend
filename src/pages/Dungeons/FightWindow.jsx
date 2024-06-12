import React from "react";

const FightWindow = ({
  currentMonsterRef,
  attackStatus,
  progress,
  handleAttack,
}) => {
  return (
    <>
      {attackStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85">
          <div className="customShadow flex h-[400px] w-[350px] flex-col items-center justify-center gap-16 rounded-md bg-black">
            <div className="bg-transparent">
              <h2 className="text-4xl">Fighting...</h2>
            </div>
            <div>
              <h1 className="w-[150px] text-2xl">
                {currentMonsterRef.current.name}
              </h1>
              <img
                src={`data:image/jpeg;base64,${currentMonsterRef.current.image}`}
                alt={currentMonsterRef.current.name}
                className="m-auto h-[66px] w-[84px]"
              />
            </div>
            <div className="relative w-[80%] rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="loading-bar h-4 rounded-full bg-green-600 p-0.5 text-xs font-medium leading-none text-blue-100"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-start text-xs text-white">
                {progress}%
              </span>
            </div>

            <button
              className="h-8 w-36 rounded-md border-2 border-gray-700 bg-black text-yellow-600 hover:border-white"
              onClick={() => handleAttack(currentMonsterRef.current)}
            >
              Run away
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FightWindow;
