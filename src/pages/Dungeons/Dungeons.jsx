import React, { useEffect, useState, useRef } from "react";
import fnFetchWithAuth from "../../api/fnFetchWithAuth";
import ErrorPage from "../ErrorPage/ErrorPage";

const Dungeons = () => {
  const [monsters, setMonsters] = useState([]);
  const [attackStatus, setAttackStatus] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const controllerRef = useRef(null);
  const currentMonsterRef = useRef(null);
  const intervalRef = useRef(null);
  const isAuthenticated = localStorage.getItem("access_token") !== null;

  const fetchData = async () => {
    try {
      const response = await fnFetchWithAuth("/monsters");
      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort(
          (a, b) => parseFloat(a.level) - parseFloat(b.level),
        );
        setMonsters(sortedData);
      } else {
        console.error("Failed to fetch data", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAttack = async (monster) => {
    try {
      if (controllerRef.current) {
        controllerRef.current.abort();
        controllerRef.current = null;
        return;
      }
      setAttackStatus(true);
      setCooldown(true);
      currentMonsterRef.current = monster;
      loadingBarAnimation();
      setTimeout(() => setCooldown(false), 10000);

      controllerRef.current = new AbortController();
      const signal = controllerRef.current.signal;
      const playerId = localStorage.getItem("selectedPlayerId");
      const response = await fnFetchWithAuth(
        `/players/${playerId}/monsters/${monster.id}`,
        {
          method: "POST",
          signal,
        },
      );
      if (response.ok) {
        const data = await response.text();
        setModalMessage(data);
        setModalVisible(true);
      } else {
        setAttackStatus(false);
        console.error("Failed to attack monster", response.status);
      }
    } catch (error) {
      setAttackStatus(false);
      if (error.name === "AbortError") {
        console.log("Request aborted");
      } else {
        console.error("Error:", error);
      }
    }
  };

  const loadingBarAnimation = () => {
    if (!attackStatus) {
      setProgress(0);
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setAttackStatus(false);
          return 100;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 100);
  };

  return isAuthenticated ? (
    <div className="absolute grid h-full w-[100vw] grid-cols-1 justify-items-center overflow-y-auto px-[100px] py-[200px] text-center text-yellow-600 lg:grid-cols-3">
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
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85">
          <div className="customShadow flex h-[200px] w-[300px] flex-col items-center justify-center gap-4 rounded-md bg-black p-4">
            <p className="text-4xl text-yellow-500">{modalMessage}</p>
            <p className="text-[12px] italic text-yellow-500">
              {modalMessage === "You won"
                ? "check your inventory, maybe you found something..."
                : "sadly..."}
            </p>
            <button
              className="h-8 w-24 rounded-md border-2 border-gray-700 bg-black text-yellow-600 hover:border-white"
              onClick={() => setModalVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
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
    </div>
  ) : (
    <ErrorPage />
  );
};

export default Dungeons;
