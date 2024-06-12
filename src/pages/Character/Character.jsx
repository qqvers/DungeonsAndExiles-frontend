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
import ErrorPage from "../ErrorPage/ErrorPage";
import Backpack from "./Backpack";

import ItemWindow from "./ItemWindow";
import Equipment from "./Equipment";

const Character = () => {
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [backpackItems, setBackpackItems] = useState([]);
  const player = JSON.parse(localStorage.getItem("player"));
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState("");
  const isEqItemRef = useRef(false);
  const isAuthenticated = localStorage.getItem("access_token") !== null;

  const itemStyles =
    "flex h-16 w-16 items-center justify-center border-2 bg-gray-800";

  const getElementColor = (item) => {
    const name = item && item.name.toLowerCase();
    let color;

    if (item) {
      switch (true) {
        case name.includes("basic"):
          color = "white";
          break;
        case name.includes("steel"):
          color = "yellow-500";
          break;
        case name.includes("titanium"):
          color = "orange-500";
          break;
        case name.includes("diamond"):
          color = "purple-500";
          break;
        case name.includes("leather"):
          color = "green-500";
          break;
        case name.includes("iron"):
          color = "blue-500";
          break;
      }
    } else {
      color = "gray-600";
    }

    return color;
  };
  const getItemIcon = (item, itemType) => {
    const color = getElementColor(item);
    let textColor;

    switch (color) {
      case "white":
        textColor = "text-white";
        break;
      case "orange-500":
        textColor = "text-orange-500";
        break;
      case "purple-500":
        textColor = "text-purple-500";
        break;
      case "green-500":
        textColor = "text-green-500";
        break;
      case "blue-500":
        textColor = "text-blue-500";
        break;
      case "red-500":
        textColor = "text-red-500";
        break;
      case "yellow-500":
        textColor = "text-yellow-500";
        break;
      default:
        textColor = "text-gray-600";
        break;
    }

    const selectItemType = itemType ? itemType : item.type.toLowerCase();
    switch (selectItemType) {
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

  const getBorderClass = (borderColor) => {
    switch (borderColor) {
      case "red-500":
        return "border-red-500";
      case "blue-500":
        return "border-blue-500";
      case "green-500":
        return "border-green-500";
      case "yellow-500":
        return "border-yellow-500";
      case "purple-500":
        return "border-purple-500";
      case "white":
        return "border-white";
      case "orange-500":
        return "border-orange-500";
      default:
        return "border-gray-600"; // Default border color
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

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return isAuthenticated ? (
    <div className="flex h-full w-full 2xl:justify-center">
      <div className="customShadow mx-8 mt-44 flex h-[800px] w-[440px] flex-col items-center justify-start overflow-hidden rounded-lg bg-black/90">
        <h1 className="pt-4 text-3xl text-yellow-500">{player.name}</h1>
        <p className="text-yellow-500">level: {player.level}</p>
        <Equipment
          equipmentItems={equipmentItems}
          getBorderClass={getBorderClass}
          getElementColor={getElementColor}
          itemStyles={itemStyles}
          getItemIcon={getItemIcon}
          handleItemClick={handleItemClick}
        />

        <Backpack
          backpackItems={backpackItems}
          getElementColor={getElementColor}
          getItemIcon={getItemIcon}
          getBorderClass={getBorderClass}
          itemStyles={itemStyles}
          handleItemClick={handleItemClick}
        />
      </div>
      <ItemWindow
        modalItem={modalItem}
        modalVisible={modalVisible}
        isEqItemRef={isEqItemRef}
        handleDeleteItem={handleDeleteItem}
        handleCloseModal={handleCloseModal}
        handleEquipItem={handleEquipItem}
      />
    </div>
  ) : (
    <ErrorPage />
  );
};

export default Character;
