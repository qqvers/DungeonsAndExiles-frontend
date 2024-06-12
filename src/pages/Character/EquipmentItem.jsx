import React from "react";
import classNames from "classnames";

const EquipmentItem = ({
  itemType,
  getBorderClass,
  handleItemClick,
  getItemIcon,
  getElementColor,
  itemStyles,
  equipmentItems,
}) => {
  const handleEquippedItem = (type) => {
    const checkItem = equipmentItems.find(
      (item) => item.type.toLowerCase() === type,
    );
    return checkItem ? checkItem : false;
  };
  return (
    <>
      {(() => {
        const item = handleEquippedItem(itemType);
        const borderColor = getElementColor(item);

        return (
          <div
            key={item.id}
            className={classNames(itemStyles, getBorderClass(borderColor))}
            onClick={() => handleItemClick(item, true)}
          >
            {getItemIcon(item, itemType)}
          </div>
        );
      })()}
    </>
  );
};

export default EquipmentItem;
