import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_API_URL;
let refreshTokenPromise = null;

const fnFetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("access_token");
  const fetchOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(apiUrl + url, fetchOptions);

  if (response.status === 401) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshAccessToken();
    }

    const newToken = await refreshTokenPromise;
    refreshTokenPromise = null;

    if (newToken) {
      localStorage.setItem("access_token", newToken);
      fetchOptions.headers["Authorization"] = `Bearer ${newToken}`;
      return fetch(apiUrl + url, fetchOptions);
    }
  }

  return response;
};

const refreshAccessToken = async () => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.sub;
  const response = await fetch(apiUrl + "/users/" + userId + "/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken: token,
      refreshToken: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token", response);
  }

  const data = await response.json();
  return data.jwtToken;
};

export default fnFetchWithAuth;
