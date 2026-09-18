import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    petName: {
      type: String,
      required: true,
    },
    petImage: {
      type: String,
    },
    petBreed: {
      type: String,
    },
    applicantName: {
      type: String,
      required: true,
      trim: true,
    },
    applicantEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    applicantPhone: {
      type: String,
      required: true,
      trim: true,
    },
    applicantLocation: {
      type: String,
      required: true,
      trim: true,
    },
    housingType: {
      type: String,
      default: "House",
    },
    ownOrRent: {
      type: String,
      default: "Own",
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Adoption = mongoose.model("Adoption", adoptionSchema);
export default Adoption;
