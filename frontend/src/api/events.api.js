import { api } from "./client";

export const EventsAPI = {
  list: () => api.get("/events"),
  get: (id) => api.get(`/events/${id}`),
  create: (payload) => api.post("/events", payload),
  update: (id, payload) => api.put(`/events/${id}`, payload),
  remove: (id) => api.delete(`/events/${id}`),
};
