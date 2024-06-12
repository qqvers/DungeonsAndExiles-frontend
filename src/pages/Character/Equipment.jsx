import React from "react";
import EquipmentItem from "./EquipmentItem";
import { FaLock } from "react-icons/fa";

const Equipment = ({
  equipmentItems,
  getElementColor,
  itemStyles,
  getBorderClass,
  getItemIcon,
  handleItemClick,
}) => {
  return (
    <div className="grid h-[350px] w-full grid-cols-3 place-content-center items-center gap-y-8">
      <div className="flex h-16 w-16 items-center justify-center justify-self-end border-2 border-gray-600 bg-gray-800">
        <FaLock className="text-gray-600" size={30} />
      </div>
      <div className="flex h-16 w-16 items-center justify-center justify-self-center border-2 border-gray-600 bg-gray-800">
        <EquipmentItem
          itemType="helmet"
          equipmentItems={equipmentItems}
          getElementColor={getElementColor}
          itemStyles={itemStyles}
          getBorderClass={getBorderClass}
          getItemIcon={getItemIcon}
          handleItemClick={handleItemClick}
        />
      </div>
      <div className="flex h-16 w-16 items-center justify-center border-2 border-gray-600 bg-gray-800">
        <FaLock className="text-gray-600" size={30} />
      </div>
      <div className="flex h-16 w-16 items-center justify-center justify-self-end border-2 border-gray-600 bg-gray-800">
        <EquipmentItem
          itemType="weapon"
          equipmentItems={equipmentItems}
          getElementColor={getElementColor}
          itemStyles={itemStyles}
          getBorderClass={getBorderClass}
          getItemIcon={getItemIcon}
          handleItemClick={handleItemClick}
        />
      </div>
      <div className="flex h-16 w-16 items-center justify-center justify-self-center border-2 border-gray-600 bg-gray-800">
        <EquipmentItem
          itemType="body armor"
          equipmentItems={equipmentItems}
          getElementColor={getElementColor}
          itemStyles={itemStyles}
          getBorderClass={getBorderClass}
          getItemIcon={getItemIcon}
          handleItemClick={handleItemClick}
        />
      </div>
      <div className="flex h-16 w-16 items-center justify-center border-2 border-gray-600 bg-gray-800">
        <FaLock className="text-gray-600" size={30} />
      </div>
      <div className="flex h-16 w-16 items-center justify-center justify-self-end border-2 border-gray-600 bg-gray-800">
        <EquipmentItem
          itemType="gloves"
          equipmentItems={equipmentItems}
          getElementColor={getElementColor}
          itemStyles={itemStyles}
          getBorderClass={getBorderClass}
          getItemIcon={getItemIcon}
          handleItemClick={handleItemClick}
        />
      </div>
      <div className="flex h-16 w-16 items-center justify-center justify-self-center border-2 border-gray-600 bg-gray-800">
        <EquipmentItem
          itemType="boots"
          equipmentItems={equipmentItems}
          getElementColor={getElementColor}
          itemStyles={itemStyles}
          getBorderClass={getBorderClass}
          getItemIcon={getItemIcon}
          handleItemClick={handleItemClick}
        />
      </div>
      <div className="flex h-16 w-16 items-center justify-center border-2 border-gray-600 bg-gray-800">
        <FaLock className="text-gray-600" size={30} />
      </div>
    </div>
  );
};

export default Equipment;
