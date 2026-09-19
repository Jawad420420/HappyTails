import Vaccination from "../models/Vaccination.js";

export const addVaccination = async (req, res) => {
  try {
    const { petName, vaccineName, dueDate } = req.body;

    if (!petName || !vaccineName || !dueDate) {
      return res.status(400).json({
        message: "Pet name, vaccine name and due date are required",
      });
    }

    const vaccination = await Vaccination.create({
      user: req.user.id,
      petName,
      vaccineName,
      dueDate,
      status: "pending",
    });

    res.status(201).json({ message: "Vaccination reminder added", vaccination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVaccination = async (req, res) => {
  try {
    const vaccination = await Vaccination.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!vaccination) {
      return res.status(404).json({ message: "Vaccination reminder not found" });
    }

    const { petName, vaccineName, dueDate, status, reminderSent } = req.body;
    if (petName !== undefined) vaccination.petName = petName;
    if (vaccineName !== undefined) vaccination.vaccineName = vaccineName;
    if (dueDate !== undefined) vaccination.dueDate = dueDate;
    if (status !== undefined) vaccination.status = status;
    if (reminderSent !== undefined) vaccination.reminderSent = reminderSent;

    await vaccination.save();

    res.json({ message: "Vaccination reminder updated", vaccination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyVaccinations = async (req, res) => {
  try {
    const vaccinations = await Vaccination.find({ user: req.user.id }).sort({ dueDate: 1 });
    res.json(vaccinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVaccination = async (req, res) => {
  try {
    const vaccination = await Vaccination.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!vaccination) {
      return res.status(404).json({ message: "Vaccination reminder not found" });
    }

    res.json({ message: "Vaccination reminder deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
