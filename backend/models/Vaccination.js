import mongoose from "mongoose";

const vaccinationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    petName: { type: String, required: true, trim: true },
    vaccineName: { type: String, required: true, trim: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    reminderSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Vaccination = mongoose.model("Vaccination", vaccinationSchema);
export default Vaccination;
