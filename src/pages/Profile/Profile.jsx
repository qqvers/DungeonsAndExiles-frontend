import React, { useState, useEffect } from "react";
import fnFetchWithAuth from "../../api/fnFetchWithAuth";
import ErrorPage from "../ErrorPage/ErrorPage";
import PlayerList from "./PlayerList";
import EmptyPlayerList from "./EmptyPlayerList";
const Profile = () => {
  const [players, setPlayers] = useState([]);
  const isAuthenticated = localStorage.getItem("access_token") !== null;

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fnFetchWithAuth(`/users/${userId}/players`);

      if (response.ok) {
        const text = await response.text();

        if (text) {
          const data = JSON.parse(text);
          setPlayers(data);
        } else {
          setPlayers([]);
        }
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

  return isAuthenticated ? (
    <div className="bg-blue ml-24 flex h-full w-full flex-col items-start justify-center text-white 2xl:ml-0 2xl:items-center">
      <div className="customShadow mb-36 h-[610px] w-[300px] overflow-hidden rounded-lg bg-black/90">
        <h1 className="py-4 text-center text-2xl text-yellow-500">
          Select your player:
        </h1>
        <PlayerList players={players} fetchData={fetchData} />
        <EmptyPlayerList players={players} fetchData={fetchData} />
      </div>
    </div>
  ) : (
    <ErrorPage />
  );
};

export default Profile;
