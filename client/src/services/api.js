// services/api.js
// A single, shared Axios instance used by every service file.
// Centralizing this means: one place to set the base URL, one place to attach the auth token.

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. http://localhost:5000/api
});

// This runs before EVERY request made using "api".
// If a token exists in localStorage, attach it automatically.
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");

  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;