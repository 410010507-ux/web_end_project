import client from "./client";

export const EventsAPI = {
  list(params) {
    // params 可用：{ keyword, status }
    return client.get("/events", { params });
  },
  get(id) {
    return client.get(`/events/${id}`);
  },
  create(payload) {
    return client.post("/events", payload);
  },
  update(id, payload) {
    return client.put(`/events/${id}`, payload);
  },
  remove(id) {
    return client.delete(`/events/${id}`);
  },

  // registrations
  registrations(eventId) {
    return client.get(`/events/${eventId}/registrations`);
  },
  createRegistration(eventId, payload) {
    return client.post(`/events/${eventId}/registrations`, payload);
  },
};
