import Volunteer from '../models/Volunteer.js';

// Create new application
export const createApplication = async (req, res) => {
  try {
    // Automatically attach logged-in user's ID
    const newApp = new Volunteer({
      ...req.body,
      userId: req.user.id || req.user._id,
    });
    await newApp.save();
    res.status(201).json({ message: 'Application submitted successfully', data: newApp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch logged-in user's applications (For User Dashboard)
export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const applications = await Volunteer.find({ userId }).sort({ appliedDate: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all applications (For Admin or filter by email)
export const getApplications = async (req, res) => {
  try {
    const filter = req.query.email ? { email: req.query.email } : {};
    const applications = await Volunteer.find(filter).sort({ appliedDate: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update status (Approve / Reject)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};