import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EventsListPage from "../pages/EventsListPage";
import EventCreatePage from "../pages/EventCreatePage";
import EventEditPage from "../pages/EventEditPage";
import EventDetailPage from "../pages/EventDetailPage";
import RegistrationsPage from "../pages/RegistrationsPage";

export default function AppRouter() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<EventsListPage />} />
          <Route path="/events/new" element={<EventCreatePage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/events/:id/edit" element={<EventEditPage />} />
          <Route path="/events/:id/registrations" element={<RegistrationsPage />} />
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </div>
    </>
  );
}
