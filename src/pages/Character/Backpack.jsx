import React from "react";
import classNames from "classnames";

const Backpack = ({
  backpackItems,
  getElementColor,
  getItemIcon,
  getBorderClass,
  itemStyles,
  handleItemClick,
}) => {
  return (
    <div className="grid h-[200px] w-fit grid-cols-5 pt-20">
      {backpackItems.slice(0, 20).map((item, index) => {
        const borderColor = getElementColor(item);

        return (
          <div
            key={index}
            className={classNames(itemStyles, getBorderClass(borderColor))}
            onClick={() => handleItemClick(item)}
          >
            {getItemIcon(item)}
          </div>
        );
      })}

      {backpackItems.length < 20 &&
        Array.from({ length: 20 - backpackItems.length }).map((_, index) => (
          <div
            key={index + backpackItems.length}
            className="flex h-16 w-16 items-center justify-center border-2 border-gray-600 bg-gray-800"
          ></div>
        ))}
    </div>
  );
};

export default Backpack;
