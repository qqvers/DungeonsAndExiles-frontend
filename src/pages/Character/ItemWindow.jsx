import React from "react";

const ItemWindow = ({
  modalItem,
  modalVisible,
  isEqItemRef,
  handleDeleteItem,
  handleCloseModal,
  handleEquipItem,
}) => {
  return (
    <>
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
    </>
  );
};

export default ItemWindow;
