import React from "react";

const AccountFormError = ({ message, errors }) => {
  return (
    <>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      {Object.keys(errors).length > 0 && (
        <div className="ml-12 mt-4 w-[300px] text-center text-red-500">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key]}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default AccountFormError;
