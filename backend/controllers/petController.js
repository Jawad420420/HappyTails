import Pet from "../models/Pet.js";

// GET /api/pets - Get all pets (with optional filters: type, status, search)
export const getPets = async (req, res) => {
  try {
    const { type, status, search } = req.query;
    const query = {};

    if (type && type !== "all") {
      query.type = type.toLowerCase();
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { breed: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const pets = await Pet.find(query).sort({ createdAt: -1 });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/pets/:id - Get a single pet by ID
export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/pets - Create a new pet (Admin only)
export const createPet = async (req, res) => {
  try {
    const {
      name,
      type,
      breed,
      age,
      ageGroup,
      gender,
      location,
      aboutText,
      mainImage,
      galleryImages,
      isVaccinated,
      isDewormed,
      isNeutered,
      isHealthy,
      personality,
    } = req.body;

    if (!name || !type || !breed || !age || !gender || !location || !aboutText || !mainImage) {
      return res.status(400).json({
        message: "Please fill all required fields: name, type, breed, age, gender, location, description, and image URL.",
      });
    }

    const newPet = await Pet.create({
      name,
      type: type.toLowerCase(),
      breed,
      age,
      ageGroup: ageGroup || "adult",
      gender: gender.toLowerCase(),
      location,
      aboutText,
      mainImage,
      galleryImages: Array.isArray(galleryImages) ? galleryImages : [mainImage],
      isVaccinated: isVaccinated ?? true,
      isDewormed: isDewormed ?? true,
      isNeutered: isNeutered ?? false,
      isHealthy: isHealthy ?? true,
      personality: Array.isArray(personality) ? personality : (personality ? personality.split(",").map((p) => p.trim()) : []),
      status: "available",
    });

    res.status(201).json({
      message: "Pet created successfully",
      pet: newPet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/pets/:id - Delete a pet (Admin only)
export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: "Pet deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
