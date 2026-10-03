import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Utensils", "Stethoscope", "Heart", "ShieldCheck"],
      default: "Utensils",
    },
  },
  { timestamps: true }
);

const Guide = mongoose.model("Guide", guideSchema);
export default Guide;