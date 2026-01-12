import mongoose from "mongoose";
import Event from "../models/Event.js";

// 統一回應格式
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

export async function createEvent(req, res) {
  try {
    const created = await Event.create(req.body);
    return ok(res, created, "Event created", 201);
  } catch (err) {
    if (err.name === "ValidationError") {
      const details = Object.values(err.errors).map((e) => e.message);
      return fail(res, "Validation failed", 400, "VALIDATION_ERROR", details);
    }
    return fail(res, "Server error", 500, "SERVER_ERROR", [err.message]);
  }
}

export async function getEvents(req, res) {
  try {
    const { keyword, status } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (keyword) filter.title = { $regex: keyword, $options: "i" };

    const items = await Event.find(filter).sort({ createdAt: -1 });
    return ok(res, { items, total: items.length }, "Events fetched");
  } catch (err) {
    return fail(res, "Server error", 500, "SERVER_ERROR", [err.message]);
  }
}

export async function getEventById(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return fail(res, "Invalid event id", 400, "INVALID_ID", [id]);
    }

    const found = await Event.findById(id);
    if (!found) {
      return fail(res, "Event not found", 404, "NOT_FOUND", [id]);
    }
    return ok(res, found, "Event fetched");
  } catch (err) {
    return fail(res, "Server error", 500, "SERVER_ERROR", [err.message]);
  }
}

export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return fail(res, "Invalid event id", 400, "INVALID_ID", [id]);
    }

    const updated = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return fail(res, "Event not found", 404, "NOT_FOUND", [id]);
    }

    return ok(res, updated, "Event updated");
  } catch (err) {
    if (err.name === "ValidationError") {
      const details = Object.values(err.errors).map((e) => e.message);
      return fail(res, "Validation failed", 400, "VALIDATION_ERROR", details);
    }
    return fail(res, "Server error", 500, "SERVER_ERROR", [err.message]);
  }
}

export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return fail(res, "Invalid event id", 400, "INVALID_ID", [id]);
    }

    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return fail(res, "Event not found", 404, "NOT_FOUND", [id]);
    }

    return ok(res, deleted, "Event deleted");
  } catch (err) {
    return fail(res, "Server error", 500, "SERVER_ERROR", [err.message]);
  }
}
