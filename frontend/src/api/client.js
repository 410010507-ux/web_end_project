import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
  timeout: 15000,
});

export function getErrorMessage(err) {
  return (
    err?.response?.data?.message ||
    err?.message ||
    "Request failed"
  );
}
console.log("BASE URL =", import.meta.env.VITE_API_BASE_URL);
