import client from "./client";

export const RegistrationsAPI = {
  create(eventId, payload) {
    return client.post(`/events/${eventId}/registrations`, payload);
  },
  listByEvent(eventId) {
    return client.get(`/events/${eventId}/registrations`);
  },
  update(registrationId, payload) {
    return client.put(`/registrations/${registrationId}`, payload);
  },
  remove(registrationId) {
    return client.delete(`/registrations/${registrationId}`);
  },
};

export default RegistrationsAPI;
