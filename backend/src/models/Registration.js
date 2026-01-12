import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "eventId is required"],
      index: true,
    },
    name: { type: String, required: [true, "name is required"], trim: true },
    email: { type: String, required: [true, "email is required"], trim: true, lowercase: true },
    phone: { type: String, default: "" },
    note: { type: String, default: "" },
    status: {
      type: String,
      enum: ["registered", "cancelled"],
      default: "registered",
    },
  },
  { timestamps: true }
);

registrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

export default mongoose.model("Registration", registrationSchema);
