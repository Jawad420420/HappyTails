import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pet name is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["dog", "cat", "other"],
      required: [true, "Animal type is required"],
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
      trim: true,
    },
    age: {
      type: String,
      required: [true, "Age is required"],
      trim: true,
    },
    ageGroup: {
      type: String,
      enum: ["baby", "young", "adult", "senior"],
      default: "adult",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    aboutText: {
      type: String,
      required: [true, "Description is required"],
    },
    mainImage: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    galleryImages: [
      {
        type: String,
        trim: true,
      },
    ],
    isVaccinated: {
      type: Boolean,
      default: true,
    },
    isDewormed: {
      type: Boolean,
      default: true,
    },
    isNeutered: {
      type: Boolean,
      default: false,
    },
    isHealthy: {
      type: Boolean,
      default: true,
    },
    personality: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["available", "adopted"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
