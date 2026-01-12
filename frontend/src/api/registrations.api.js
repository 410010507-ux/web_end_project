import { api } from "./client";

export const RegistrationsAPI = {
  listByEvent: (eventId) => api.get(`/events/${eventId}/registrations`),
  createForEvent: (eventId, payload) => api.post(`/events/${eventId}/registrations`, payload),
  update: (id, payload) => api.put(`/registrations/${id}`, payload),
  remove: (id) => api.delete(`/registrations/${id}`),
};
