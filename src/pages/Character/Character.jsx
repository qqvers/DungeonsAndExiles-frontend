import React, { useEffect, useState, useRef } from "react";
import {
  GiGloves,
  GiBroadsword,
  GiSteeltoeBoots,
  GiCenturionHelmet,
  GiAbdominalArmor,
} from "react-icons/gi";
import { FaLock } from "react-icons/fa";
import fnFetchWithAuth from "../../api/fnFetchWithAuth";
import classNames from "classnames";
import ErrorPage from "../ErrorPage/ErrorPage";

const Character = () => {
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [backpackItems, setBackpackItems] = useState([]);
  const player = JSON.parse(localStorage.getItem("player"));
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState("");
  const isEqItemRef = useRef(false);
  const isAuthenticated = localStorage.getItem("access_token") !== null;

  const handleElementColor = (item) => {
    const name = item.name.toLowerCase();
    if (name.includes("basic")) {
      return "white";
    } else if (name.includes("steel")) {
      return "yellow-500";
    } else if (name.includes("titanium")) {
      return "orange-500";
    } else if (name.includes("diamond")) {
      return "purple-500";
    } else if (name.includes("leather")) {
      return "green-500";
    } else if (name.includes("iron")) {
      return "blue-500";
    } else {
      return "red-500";
    }
  };

  const fetchEquipmentData = async () => {
    try {
      const playerId = localStorage.getItem("selectedPlayerId");
      const response = await fnFetchWithAuth(
        `/players/${playerId}/equipments/items`,
      );
      const data = await response.json();
      setEquipmentItems(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchBackpackData = async () => {
    try {
      const playerId = localStorage.getItem("selectedPlayerId");
      const response = await fnFetchWithAuth(
        `/players/${playerId}/backpacks/items`,
      );
      const data = await response.json();
      setBackpackItems(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchEquipmentData();
    fetchBackpackData();
  }, []);

  const getItemIcon = (item) => {
    const color = handleElementColor(item);
    let textColor;
    if (color === "white") {
      textColor = "text-white";
    } else if (color === "orange-500") {
      textColor = "text-orange-500";
    } else if (color === "purple-500") {
      textColor = "text-purple-500";
    } else if (color === "green-500") {
      textColor = "text-green-500";
    } else if (color === "blue-500") {
      textColor = "text-blue-500";
    } else if (color === "red-500") {
      textColor = "text-red-500";
    } else if (color === "yellow-500") {
      textColor = "text-yellow-500";
    }

    switch (item.type.toLowerCase()) {
      case "weapon":
        return <GiBroadsword className={textColor} size={30} />;
      case "helmet":
        return <GiCenturionHelmet className={textColor} size={30} />;
      case "body armor":
        return <GiAbdominalArmor className={textColor} size={30} />;
      case "gloves":
        return <GiGloves className={textColor} size={30} />;
      case "boots":
        return <GiSteeltoeBoots className={textColor} size={30} />;
      default:
        return <FaLock className="text-gray-600" size={30} />;
    }
  };
  const handleItemClick = (item, eq) => {
    if (eq) {
      isEqItemRef.current = true;
    } else {
      isEqItemRef.current = false;
    }
    setModalVisible(true);
    setModalItem(item);
  };

  const handleEquipItem = async (itemId) => {
    try {
      const playerId = localStorage.getItem("selectedPlayerId");
      const response = await fnFetchWithAuth(
        `/players/${playerId}/items/${itemId}`,
        {
          method: "POST",
        },
      );
      if (response.ok) {
        fetchEquipmentData();
        fetchBackpackData();
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const playerId = localStorage.getItem("selectedPlayerId");
      const response = await fnFetchWithAuth(
        `/players/${playerId}/backpacks/items/${itemId}`,
        {
          method: "Delete",
        },
      );
      if (response.ok) {
        fetchEquipmentData();
        fetchBackpackData();
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEquippedItem = (type) => {
    const checkItem = equipmentItems.find(
      (item) => item.type.toLowerCase() === type,
    );
    return checkItem ? checkItem : false;
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return isAuthenticated ? (
    <div className="flex h-full w-full 2xl:justify-center">
      <div className="customShadow mx-8 mt-44 flex h-[800px] w-[440px] flex-col items-center justify-start overflow-hidden rounded-lg bg-black/90">
        <h1 className="pt-4 text-3xl text-yellow-500">{player.name}</h1>
        <p className="text-yellow-500">level: {player.level}</p>
        <div className="grid h-[350px] w-full grid-cols-3 place-content-center items-center gap-y-8">
          <div className="flex h-16 w-16 items-center justify-center justify-self-end border-2 border-gray-600 bg-gray-800">
            <FaLock className="text-gray-600" size={30} />
          </div>
          <div className="flex h-16 w-16 items-center justify-center justify-self-center border-2 border-gray-600 bg-gray-800">
            {handleEquippedItem("helmet") ? (
              (() => {
                const item = handleEquippedItem("helmet");
                const borderColor = handleElementColor(item);

                return (
                  <div
                    key={item.id}
                    className={classNames(
                      "flex h-16 w-16 items-center justify-center border-2 bg-gray-800",
                      {
                        "border-red-500": borderColor === "red-500",
                        "border-blue-500": borderColor === "blue-500",
                        "border-green-500": borderColor === "green-500",
                        "border-yellow-500": borderColor === "yellow-500",
                        "border-purple-500": borderColor === "purple-500",
                        "border-white": borderColor === "white",
                        "border-orange-500": borderColor === "orange-500",
                      },
                    )}
                    onClick={() => handleItemClick(item, true)}
                  >
                    {getItemIcon(item)}
                  </div>
                );
              })()
            ) : (
              <GiCenturionHelmet className="text-gray-600" size={30} />
            )}
          </div>
          <div className="flex h-16 w-16 items-center justify-center border-2 border-gray-600 bg-gray-800">
            <FaLock className="text-gray-600" size={30} />
          </div>
          <div className="flex h-16 w-16 items-center justify-center justify-self-end border-2 border-gray-600 bg-gray-800">
            {handleEquippedItem("weapon") ? (
              (() => {
                const item = handleEquippedItem("weapon");
                const borderColor = handleElementColor(item);

                return (
                  <div
                    key={item.id}
                    className={classNames(
                      "flex h-16 w-16 items-center justify-center border-2 bg-gray-800",
                      {
                        "border-red-500": borderColor === "red-500",
                        "border-blue-500": borderColor === "blue-500",
                        "border-green-500": borderColor === "green-500",
                        "border-yellow-500": borderColor === "yellow-500",
                        "border-purple-500": borderColor === "purple-500",
                        "border-white": borderColor === "white",
                        "border-orange-500": borderColor === "orange-500",
                      },
                    )}
                    onClick={() => handleItemClick(item, true)}
                  >
                    {getItemIcon(item)}
                  </div>
                );
              })()
            ) : (
              <GiBroadsword className="text-gray-600" size={30} />
            )}
          </div>
          <div className="flex h-16 w-16 items-center justify-center justify-self-center border-2 border-gray-600 bg-gray-800">
            {handleEquippedItem("body armor") ? (
              (() => {
                const item = handleEquippedItem("body armor");
                const borderColor = handleElementColor(item);

                return (
                  <div
                    key={item.id}
                    className={classNames(
                      "flex h-16 w-16 items-center justify-center border-2 bg-gray-800",
                      {
                        "border-red-500": borderColor === "red-500",
                        "border-blue-500": borderColor === "blue-500",
                        "border-green-500": borderColor === "green-500",
                        "border-yellow-500": borderColor === "yellow-500",
                        "border-purple-500": borderColor === "purple-500",
                        "border-white": borderColor === "white",
                        "border-orange-500": borderColor === "orange-500",
                      },
                    )}
                    onClick={() => handleItemClick(item, true)}
                  >
                    {getItemIcon(item)}
                  </div>
                );
              })()
            ) : (
              <GiAbdominalArmor className="text-gray-600" size={30} />
            )}
          </div>
          <div className="flex h-16 w-16 items-center justify-center border-2 border-gray-600 bg-gray-800">
            <FaLock className="text-gray-600" size={30} />
          </div>
          <div className="flex h-16 w-16 items-center justify-center justify-self-end border-2 border-gray-600 bg-gray-800">
            {handleEquippedItem("gloves") ? (
              (() => {
                const item = handleEquippedItem("gloves");
                const borderColor = handleElementColor(item);

                return (
                  <div
                    key={item.id}
                    className={classNames(
                      "flex h-16 w-16 items-center justify-center border-2 bg-gray-800",
                      {
                        "border-red-500": borderColor === "red-500",
                        "border-blue-500": borderColor === "blue-500",
                        "border-green-500": borderColor === "green-500",
                        "border-yellow-500": borderColor === "yellow-500",
                        "border-purple-500": borderColor === "purple-500",
                        "border-white": borderColor === "white",
                        "border-orange-500": borderColor === "orange-500",
                      },
                    )}
                    onClick={() => handleItemClick(item, true)}
                  >
                    {getItemIcon(item)}
                  </div>
                );
              })()
            ) : (
              <GiGloves className="text-gray-600" size={30} />
            )}
          </div>
          <div className="flex h-16 w-16 items-center justify-center justify-self-center border-2 border-gray-600 bg-gray-800">
            {handleEquippedItem("boots") ? (
              (() => {
                const item = handleEquippedItem("boots");
                const borderColor = handleElementColor(item);

                return (
                  <div
                    key={item.id}
                    className={classNames(
                      "flex h-16 w-16 items-center justify-center border-2 bg-gray-800",
                      {
                        "border-red-500": borderColor === "red-500",
                        "border-blue-500": borderColor === "blue-500",
                        "border-green-500": borderColor === "green-500",
                        "border-yellow-500": borderColor === "yellow-500",
                        "border-purple-500": borderColor === "purple-500",
                        "border-white": borderColor === "white",
                        "border-orange-500": borderColor === "orange-500",
                      },
                    )}
                    onClick={() => handleItemClick(item, true)}
                  >
                    {getItemIcon(item)}
                  </div>
                );
              })()
            ) : (
              <GiSteeltoeBoots className="text-gray-600" size={30} />
            )}
          </div>
          <div className="flex h-16 w-16 items-center justify-center border-2 border-gray-600 bg-gray-800">
            <FaLock className="text-gray-600" size={30} />
          </div>
        </div>

        <div className="grid h-[200px] w-fit grid-cols-5 pt-20">
          {backpackItems.slice(0, 20).map((item, index) => {
            const borderColor = handleElementColor(item);

            return (
              <div
                key={index}
                className={classNames(
                  "flex h-16 w-16 items-center justify-center border-2 bg-gray-800",
                  {
                    "border-red-500": borderColor === "red-500",
                    "border-blue-500": borderColor === "blue-500",
                    "border-green-500": borderColor === "green-500",
                    "border-yellow-500": borderColor === "yellow-500",
                    "border-purple-500": borderColor === "purple-500",
                    "border-white": borderColor === "white",
                    "border-orange-500": borderColor === "orange-500",
                  },
                )}
                onClick={() => handleItemClick(item)}
              >
                {getItemIcon(item)}
              </div>
            );
          })}

          {backpackItems.length < 20 &&
            Array.from({ length: 20 - backpackItems.length }).map(
              (_, index) => (
                <div
                  key={index + backpackItems.length}
                  className="flex h-16 w-16 items-center justify-center border-2 border-gray-600 bg-gray-800"
                ></div>
              ),
            )}
        </div>
      </div>
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85">
          <div className="customShadow flex h-[250px] w-[400px] flex-col items-center justify-center gap-4 rounded-md bg-black p-4">
            <p className="text-4xl text-yellow-500">{modalItem.name}</p>
            <p className="text-[12px] italic text-yellow-500">
              Damage: {modalItem.damage}
            </p>
            <p className="text-[12px] italic text-yellow-500">
              Defence: {modalItem.defence}
            </p>
            <div
              className={`flex w-full ${isEqItemRef.current == true ? "justify-center" : "justify-between"} pt-8`}
            >
              {isEqItemRef.current == false && (
                <>
                  <button
                    className="h-8 w-24 rounded-md border-2 border-red-500 bg-black text-red-500 hover:bg-red-500 hover:text-black"
                    onClick={() => handleDeleteItem(modalItem.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="h-8 w-24 rounded-md border-2 border-green-500 bg-black text-green-500 hover:bg-green-500 hover:text-black"
                    onClick={() => handleEquipItem(modalItem.id)}
                  >
                    Equip
                  </button>
                </>
              )}
              <button
                className="h-8 w-24 rounded-md border-2 border-gray-700 bg-black text-yellow-600 hover:border-white"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <ErrorPage />
  );
};

export default Character;
