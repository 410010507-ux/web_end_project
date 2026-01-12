import mongoose from "mongoose";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

function ok(res, data, message = "OK", status = 200) {
  return res.status(status).json({ success: true, message, data, error: null });
}

function fail(res, message, status = 400, code = "BAD_REQUEST", details = []) {
  return res.status(status).json({
    success: false,
    message,
    data: null,
    error: { code, details },
  });
}

// POST /api/events/:eventId/registrations
export async function createRegistration(req, res) {
  try {
    const { eventId } = req.params;

    if (!mongoose.isValidObjectId(eventId)) {
      return fail(res, "Invalid event id", 400, "INVALID_ID", [eventId]);
    }

    const event = await Event.findById(eventId);
    if (!event) return fail(res, "Event not found", 404, "NOT_FOUND", [eventId]);

    // 簡單名額檢查（可選，但很實用）
    const count = await Registration.countDocuments({ eventId, status: "registered" });
    if (count >= event.quota || event.status === "closed") {
      return fail(res, "Registration closed or quota full", 409, "REGISTRATION_CLOSED", []);
    }

    const created = await Registration.create({
      ...req.body,
      eventId,
    });

    return ok(res, created, "Registration created", 201);
  } catch (err) {
    if (err.code === 11000) {
      return fail(res, "Duplicate registration (same email)", 409, "DUPLICATE", []);
    }
    if (err.name === "ValidationError") {
      const details = Object.values(err.errors).map((e) => e.message);
      return fail(res, "Validation failed", 400, "VALIDATION_ERROR", details);
    }
    return fail(res, "Server error", 500, "SERVER_ERROR", [err.message]);
  }
}

// GET /api/events/:eventId/registrations
export async function getRegistrationsByEvent(req, res) {
  try {
    const { eventId } = req.params;

    if (!mongoose.isValidObjectId(eventId)) {
      return fail(res, "Invalid event id", 400, "INVALID_ID", [eventId]);
    }

    const items = await Registration.find({ eventId }).sort({ createdAt: -1 });
    return ok(res, { items, total: items.length }, "Registrations fetched");
  } catch (err) {
    return fail(res, "Server error", 500, "SERVER_ERROR", [err.message]);
  }
}

export async function updateRegistration(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return fail(res, "Invalid registration id", 400, "INVALID_ID", [id]);
    }

    const { eventId, ...payload } = req.body;

    const updated = await Registration.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) return fail(res, "Registration not found", 404, "NOT_FOUND", [id]);
    return ok(res, updated, "Registration updated");
  } catch (err) {
    if (err.name === "ValidationError") {
      const details = Object.values(err.errors).map((e) => e.message);
      return fail(res, "Validation failed", 400, "VALIDATION_ERROR", details);
    }
    return fail(res, "Server error", 500, "SERVER_ERROR", [err.message]);
  }
}

// DELETE /api/registrations/:id
export async function deleteRegistration(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return fail(res, "Invalid registration id", 400, "INVALID_ID", [id]);
    }

    const deleted = await Registration.findByIdAndDelete(id);
    if (!deleted) return fail(res, "Registration not found", 404, "NOT_FOUND", [id]);

    return ok(res, deleted, "Registration deleted");
  } catch (err) {
    return fail(res, "Server error", 500, "SERVER_ERROR", [err.message]);
  }
}
