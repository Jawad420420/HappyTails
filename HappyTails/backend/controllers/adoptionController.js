import Adoption from "../models/Adoption.js";
import Pet from "../models/Pet.js";

// POST /api/adoptions - Submit adoption request (Auth required)
export const submitAdoption = async (req, res) => {
  try {
    const { petId, applicantName, applicantEmail, applicantPhone, applicantLocation, housingType, ownOrRent, notes } = req.body;

    if (!petId || !applicantName || !applicantEmail || !applicantPhone || !applicantLocation) {
      return res.status(400).json({
        message: "Please provide pet ID, your name, email, phone, and address.",
      });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Check if user already has an active application for this pet
    const existing = await Adoption.findOne({
      user: req.user.id,
      pet: petId,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({
        message: "You already have a pending adoption request for this pet.",
      });
    }

    const adoption = await Adoption.create({
      user: req.user.id,
      pet: pet._id,
      petName: pet.name,
      petImage: pet.mainImage,
      petBreed: pet.breed,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantLocation,
      housingType: housingType || "House",
      ownOrRent: ownOrRent || "Own",
      notes,
      status: "pending",
    });

    res.status(201).json({
      message: "Adoption application submitted successfully!",
      adoption,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/adoptions/my - Get current logged-in user's applications
export const getMyAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find({ user: req.user.id })
      .populate("pet", "name breed mainImage status location age")
      .sort({ createdAt: -1 });

    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/adoptions - Get all adoption applications (Admin only)
export const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate("user", "name email")
      .populate("pet", "name breed mainImage status")
      .sort({ createdAt: -1 });

    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/adoptions/:id/status - Update adoption application status (Admin only)
export const updateAdoptionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be 'pending', 'approved', or 'rejected'",
      });
    }

    const adoption = await Adoption.findById(req.params.id);
    if (!adoption) {
      return res.status(404).json({ message: "Adoption application not found" });
    }

    adoption.status = status;
    await adoption.save();

    // If approved, mark the pet as adopted
    if (status === "approved") {
      await Pet.findByIdAndUpdate(adoption.pet, { status: "adopted" });
    }

    res.json({
      message: `Adoption application ${status}`,
      adoption,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
