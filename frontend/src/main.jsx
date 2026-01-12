import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import "./styles/globals.css";
import { ToastProvider } from "./components/Toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>
);
