import React from "react";

const FightResultWindow = ({ modalMessage, modalVisible, setModalVisible }) => {
  return (
    <>
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
    </>
  );
};

export default FightResultWindow;
