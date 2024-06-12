import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const getDefaultValues = (isLogin) => ({
    name: "",
    email: isLogin ? "john@doe.com" : "",
    password: isLogin ? "johndoe" : "",
    repeatPassword: "",
  });
  const [formData, setFormData] = useState(getDefaultValues(isLogin));
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleForm = () => {
    setIsLogin((prevState) => !prevState);
    setFormData(getDefaultValues(!isLogin));
    setCreated(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin) {
      if (
        !formData.name ||
        formData.name.length < 2 ||
        formData.name.length > 20
      ) {
        newErrors.name = "Name must be between 2 and 20 characters";
      }
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

    if (!isLogin && formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        var response = await fetch(
          apiUrl + (isLogin ? "/users/login" : "/users/register"),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              ...(isLogin ? {} : { name: formData.name }),
            }),
          },
        );

        const data = await response.json();

        if (response.ok && isLogin) {
          localStorage.setItem("access_token", data.token.token);
          localStorage.setItem("refresh_token", data.refreshToken);
          const decodedToken = jwtDecode(data.token.token);
          const userId = decodedToken.sub;
          localStorage.setItem("userId", userId);
          navigate("/profile");
        } else if (response.ok && !isLogin) {
          setCreated(true);
          setFormData(getDefaultValues(isLogin));
        }
      } catch (error) {
        switch (response.status) {
          case 401:
            setErrors({
              server: "Invalid email or password",
            });
            break;
          case 409:
            setErrors({
              server: "User already exists",
            });
            break;
          default:
            setErrors({
              server: "An unexpected error occurred",
            });
            break;
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative py-48 sm:mx-auto sm:max-w-xl">
      <div className="relative mx-5 w-[400px] rounded-3xl bg-black/90 px-4 py-10 shadow sm:p-10 md:mx-0 2xl:w-full">
        <div className="mx-auto max-w-md text-white">
          <h2 className="text-center text-2xl font-semibold">
            {isLogin ? "Login" : "Sign up"}
          </h2>
          <form onSubmit={handleSubmit} className="mt-5">
            {!isLogin && (
              <div>
                <label
                  className="block pb-1 text-sm font-semibold text-gray-400"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="mb-5 mt-1 w-full rounded-lg border bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </div>
            )}
            <div>
              <label
                className="block pb-1 text-sm font-semibold text-gray-400"
                htmlFor="email"
                required
              >
                Email
              </label>
              <input
                className="mb-5 mt-1 w-full rounded-lg border bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                className="block pb-1 text-sm font-semibold text-gray-400"
                htmlFor="password"
                required
              >
                Password
              </label>
              <input
                className="mb-5 mt-1 w-full rounded-lg border bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            {!isLogin && (
              <div>
                <label
                  className="block pb-1 text-sm font-semibold text-gray-400"
                  htmlFor="repeatPassword"
                  required
                >
                  Repeat password
                </label>
                <input
                  className="mb-5 mt-1 w-full rounded-lg border bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="password"
                  id="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                />
                {errors.repeatPassword && (
                  <p className="text-xs text-red-500">
                    {errors.repeatPassword}
                  </p>
                )}
              </div>
            )}
            {errors.server && (
              <p className="text-xs text-red-500">{errors.server}</p>
            )}
            {created && (
              <p className="text-xs text-green-500">Account created</p>
            )}
            <div className="mt-5">
              <button
                className={`${loading ? "cursor-not-allowed border-gray-600 text-gray-600" : "border-white text-white hover:bg-white hover:text-black"} w-full rounded-lg border-2 bg-black px-4 py-2 text-center text-base font-semibold shadow-md transition duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200`}
                type="submit"
                disabled={loading}
              >
                {isLogin ? "Log in" : "Sign up"}
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="w-1/5 border-b md:w-1/4 dark:border-gray-600"></span>
            <button
              className="text-xs uppercase text-gray-500 hover:underline dark:text-gray-400"
              onClick={handleForm}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Have an account? Log in"}
            </button>
            <span className="w-1/5 border-b md:w-1/4 dark:border-gray-600"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
