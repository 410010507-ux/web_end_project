import express from "express";
import cors from "cors";
import morgan from "morgan";

import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/events", eventRoutes);
app.use("/api", registrationRoutes);

export default app;
