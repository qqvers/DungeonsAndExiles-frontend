import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import fnFetchWithAuth from "../../api/fnFetchWithAuth";
import { RiDeleteBin6Line } from "react-icons/ri";

const Profile = () => {
  const [players, setPlayers] = useState([]);
  const [createPlayer, setCreatePlayer] = useState(false);
  const [selectedForm, setSelectedForm] = useState(0);
  const [formData, setFormData] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleCreatePlayer = (index) => {
    setCreatePlayer(true);
    setSelectedForm(index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 2 || formData.name.length > 20)
      newErrors.name = "Name must be between 2 and 20 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userId = localStorage.getItem("userId");
      const response = await fnFetchWithAuth(`/users/${userId}/create-player`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
        }),
      });

      if (response.ok) {
        setFormData("");
        setCreatePlayer(false);
        fetchData();
      } else {
        if (response.status === 400) {
          setErrors({ name: "Name is taken" });
        }
        console.error("Failed to create player", response.status);
      }
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectPlayer = (playerId) => {
    localStorage.setItem("selectedPlayerId", playerId);
    navigate("/character");
  };

  const totalPlayers = 4;
  const createPlayerDivs = totalPlayers - players.length;

  return (
    <div className="bg-blue ml-24 flex h-full w-full flex-col items-start justify-center text-white 2xl:ml-0 2xl:items-center">
      <div className="customShadow mb-36 h-[610px] w-[300px] overflow-hidden rounded-lg bg-black/90">
        <h1 className="py-4 text-center text-2xl text-yellow-500">
          Your players:
        </h1>
        {players.map((player) => (
          <div
            key={player.id}
            className="relative mx-[10px] mb-4 flex h-[120px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-gray-800 text-white hover:bg-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleSelectPlayer(player.id)}
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
        {Array.from({ length: createPlayerDivs }).map((_, index) => (
          <div
            key={index}
            className="mx-[10px] mb-4 flex h-[120px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-gray-800 text-white hover:bg-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleCreatePlayer(index)}
          >
            {createPlayer & (index === selectedForm) ? (
              <form onSubmit={handleSubmit} className="mt-5 cursor-default">
                <div className="flex flex-col px-2">
                  <label
                    className="block self-start text-sm font-semibold text-white"
                    htmlFor="name"
                  >
                    Name
                  </label>

                  <input
                    className="mb-2 mt-1 w-full rounded-lg border bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="name"
                    value={formData.name ? formData.name : ""}
                    onChange={handleChange}
                    required
                  />
                  <div className="flex justify-between">
                    <p className="text-xs text-red-500">{errors.name}</p>

                    <button
                      type="submit"
                      className="mb-4 rounded-lg border-2 border-green-300 p-1 text-sm text-green-300 hover:border-green-500 hover:text-green-500"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <span className="text-green-400">Create player</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
