import { Router } from "express";
import {
  createRegistration,
  getRegistrationsByEvent,
  updateRegistration,
  deleteRegistration,
} from "../controllers/registrationController.js";

const router = Router();

router.post("/events/:eventId/registrations", createRegistration);
router.get("/events/:eventId/registrations", getRegistrationsByEvent);

router.put("/registrations/:id", updateRegistration);
router.delete("/registrations/:id", deleteRegistration);

export default router;
