import React from "react";
import { useLogout } from "../../hooks/useLogout";
import fnFetchWithAuth from "../../api/fnFetchWithAuth";

const AccountForm = ({
  formData,
  setFormData,
  errors,
  setErrors,
  setMessage,
}) => {
  const logout = useLogout();
  const validateForm = () => {
    const newErrors = {};

    if (
      !formData.name ||
      formData.name.length < 2 ||
      formData.name.length > 20
    ) {
      newErrors.name = "Name must be between 2 and 20 characters";
    }

    if (formData.email.length < 5 || formData.email.length > 30) {
      newErrors.email = "Email address must be between 5 and 30 characters";
    }

    if (
      !formData.password ||
      formData.password.length < 5 ||
      formData.password.length > 20
    ) {
      newErrors.password = "Password must be between 5 and 20 characters";
    }

    setErrors(newErrors);
    setMessage("");
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userId = localStorage.getItem("userId");
      const response = await fnFetchWithAuth(`/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage("User updated successfully");
        setErrors({});
        fetchUser();
      } else if (response.status === 405) {
        setErrors({ deleteError: "You cannot update the demo account." });
      } else {
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    if (!validateForm()) return;
    try {
      const userId = localStorage.getItem("userId");
      const response = await fnFetchWithAuth(`/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        if (response.status === 200) {
          setErrors({ deleteError: "You cannot delete the demo account." });
        } else {
          setMessage("User deleted successfully");
          logout();
        }
      } else {
        const errorData = await response.json();
        setMessage("");
        setErrors(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <form className="pl-12 pt-12" onSubmit={handleUpdate}>
        <label
          className="block pb-1 text-sm font-semibold text-gray-400"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className={`mb-5 mt-1 w-[300px] rounded-lg border bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
            errors.name ? "border-red-500" : ""
          }`}
          type="text"
          id="name"
          value={formData.name || ""}
          onChange={handleChange}
          required
        />
        <label
          className="block pb-1 text-sm font-semibold text-gray-400"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={`mb-5 mt-1 w-[300px] rounded-lg border bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-red-500" : ""
          }`}
          type="email"
          id="email"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />
        <label
          className="block pb-1 text-sm font-semibold text-gray-400"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={`mb-5 mt-1 w-[300px] rounded-lg border bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
            errors.password ? "border-red-500" : ""
          }`}
          type="password"
          id="password"
          value={formData.password || ""}
          onChange={handleChange}
          required
        />
        <button
          className="mt-4 w-[300px] rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-700"
          type="submit"
        >
          Update
        </button>
      </form>
      <button
        className="ml-12 mt-4 w-[300px] rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-700"
        onClick={handleDelete}
      >
        Delete Account
      </button>
    </>
  );
};

export default AccountForm;
