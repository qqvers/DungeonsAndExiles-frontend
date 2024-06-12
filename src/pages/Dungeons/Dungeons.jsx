import React, { useEffect, useState, useRef } from "react";
import fnFetchWithAuth from "../../api/fnFetchWithAuth";
import ErrorPage from "../ErrorPage/ErrorPage";
import MonsterList from "./MonsterList";
import FightResultWindow from "./FightResultWindow";
import FightWindow from "./FightWindow";

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
        resetAttackState();
      } else {
        console.error("Failed to attack monster", response.status);
        resetAttackState();
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request aborted");
      } else {
        console.error("Error:", error);
      }
      resetAttackState();
    }
  };

  const resetAttackState = () => {
    setAttackStatus(false);
    setProgress(0);
    clearInterval(intervalRef.current);
    controllerRef.current = null;
  };

  const loadingBarAnimation = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        return oldProgress + 1;
      });
    }, 100);
  };

  return isAuthenticated ? (
    <div className="absolute grid h-full w-[100vw] grid-cols-1 justify-items-center overflow-y-auto px-[100px] py-[200px] text-center text-yellow-600 lg:grid-cols-3">
      <FightWindow
        currentMonsterRef={currentMonsterRef}
        attackStatus={attackStatus}
        progress={progress}
        handleAttack={handleAttack}
      />
      <FightResultWindow
        modalMessage={modalMessage}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <MonsterList
        monsters={monsters}
        cooldown={cooldown}
        handleAttack={handleAttack}
      />
    </div>
  ) : (
    <ErrorPage />
  );
};

export default Dungeons;
