import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const client = axios.create({
  baseURL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});


export const api = client;
export default client;

export function getErrorMessage(err) {
  if (!err) return "Unknown error";

  const msg = err?.response?.data?.message;
  const details = err?.response?.data?.error?.details;

  if (Array.isArray(details) && details.length) return `${msg || "Error"}: ${details.join(", ")}`;
  if (typeof msg === "string" && msg) return msg;

  if (typeof err?.message === "string" && err.message) return err.message;
  return "Request failed";
}
