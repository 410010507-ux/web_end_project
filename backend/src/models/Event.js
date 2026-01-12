import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"], trim: true },
    description: { type: String, default: "" },
    date: { type: Date, required: [true, "date is required"] },
    location: { type: String, required: [true, "location is required"], trim: true },
    quota: { type: Number, required: [true, "quota is required"], min: [1, "quota must be >= 1"] },
    status: {
      type: String,
      enum: ["published", "closed"],
      default: "published",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
