import Guide from "../models/Guide.js";

// Get all guides (Public)
export const getGuides = async (req, res) => {
  try {
    const guides = await Guide.find().sort({ createdAt: -1 });
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new guide (Admin only)
export const createGuide = async (req, res) => {
  try {
    const { title, desc, category } = req.body;

    if (!title || !desc) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    const newGuide = new Guide({ title, desc, category });
    await newGuide.save();

    res.status(201).json(newGuide);
  } catch (error) {
    res.status(500).json({ message: "Failed to create guide", error: error.message });
  }
};

// Delete a guide (Admin only)
export const deleteGuide = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGuide = await Guide.findByIdAndDelete(id);

    if (!deletedGuide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    res.status(200).json({ message: "Guide deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete guide", error: error.message });
  }
};