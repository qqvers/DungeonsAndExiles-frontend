import React, { useState, useEffect } from "react";
import fnFetchWithAuth from "../../api/fnFetchWithAuth";
import ErrorPage from "../ErrorPage/ErrorPage";
import AccountForm from "./AccountForm";
import AccountFormError from "./AccountFormError";

const Account = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const isAuthenticated = localStorage.getItem("access_token") !== null;

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fnFetchWithAuth(`/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return isAuthenticated ? (
    <div className="flex h-full w-full items-center justify-start text-yellow-500 2xl:justify-center">
      <div className="customShadow ml-10 flex h-[700px] w-[400px] flex-col rounded-lg bg-black/90">
        <h1 className="pt-8 text-center text-3xl">Account settings</h1>
        <AccountForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          setMessage={setMessage}
        />
        <AccountFormError message={message} errors={errors} />
      </div>
    </div>
  ) : (
    <ErrorPage />
  );
};

export default Account;
