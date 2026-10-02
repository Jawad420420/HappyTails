import Task from '../models/Task.js';
import Volunteer from '../models/Volunteer.js';
import { uploadImage } from '../utils/uploadImage.js';

const populateTask = (q) =>
  q.populate('interested', 'name email').populate('assignedTo', 'name email');

const fail = (res, err) => res.status(500).json({ message: err.message });

// Admin: create task
export const createTask = async (req, res) => {
  try {
    const { title, description, location, dueDate } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }
    const task = await Task.create({ title, description, location, dueDate, createdBy: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    fail(res, err);
  }
};

// Admin: all tasks
export const getAllTasks = async (req, res) => {
  try {
    res.json(await populateTask(Task.find().sort({ createdAt: -1 })));
  } catch (err) {
    fail(res, err);
  }
};

// Volunteer: open tasks + every task they're interested in / assigned to.
// `isVolunteer` tells the UI whether the user is an approved volunteer.
export const getVolunteerTasks = async (req, res) => {
  try {
    const uid = req.user.id;
    const isVolunteer = !!(await Volunteer.exists({ userId: uid, status: /^approved$/i }));
    const tasks = await populateTask(
      Task.find({ $or: [{ status: 'Open' }, { interested: uid }, { assignedTo: uid }] }).sort({ createdAt: -1 })
    );
    res.json({ isVolunteer, tasks });
  } catch (err) {
    fail(res, err);
  }
};

// Volunteer: toggle interest on an open task
export const toggleInterest = async (req, res) => {
  try {
    const uid = req.user.id;
    if (!(await Volunteer.exists({ userId: uid, status: /^approved$/i }))) {
      return res.status(403).json({ message: 'Only approved volunteers can apply for tasks.' });
    }
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.status !== 'Open') return res.status(400).json({ message: 'Task is no longer open.' });

    const already = task.interested.some((id) => id.equals(uid));
    task.interested = already ? task.interested.filter((id) => !id.equals(uid)) : [...task.interested, uid];
    await task.save();
    res.json(await populateTask(Task.findById(task._id)));
  } catch (err) {
    fail(res, err);
  }
};

// Admin: pick one interested volunteer
export const assignTask = async (req, res) => {
  try {
    const { userId } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.status !== 'Open') return res.status(400).json({ message: 'Only open tasks can be assigned.' });
    if (!task.interested.some((id) => id.equals(userId))) {
      return res.status(400).json({ message: 'That volunteer has not shown interest in this task.' });
    }
    task.assignedTo = userId;
    task.status = 'Assigned';
    await task.save();
    res.json(await populateTask(Task.findById(task._id)));
  } catch (err) {
    fail(res, err);
  }
};

// Volunteer: submit proof photo (base64 data URL) for an assigned task
export const submitTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (!task.assignedTo?.equals(req.user.id)) {
      return res.status(403).json({ message: 'This task is not assigned to you.' });
    }
    if (task.status !== 'Assigned') return res.status(400).json({ message: 'Task is not awaiting submission.' });

    const proofImage = await uploadImage(req.body.proofImage, 'task-proofs');
    if (!proofImage) return res.status(400).json({ message: 'A proof photo is required.' });

    task.proofImage = proofImage;
    task.submissionNote = req.body.note || '';
    task.submittedAt = new Date();
    task.status = 'Submitted';
    await task.save();
    res.json(await populateTask(Task.findById(task._id)));
  } catch (err) {
    fail(res, err);
  }
};

// Admin: approve (Completed) or send back (Assigned) with a review message
export const reviewTask = async (req, res) => {
  try {
    const { action, message = '' } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.status !== 'Submitted') return res.status(400).json({ message: 'Task has no pending submission.' });
    if (action === 'reject' && !message.trim()) {
      return res.status(400).json({ message: 'Please write a review message explaining what to fix.' });
    }

    task.reviewMessage = message;
    if (action === 'complete') {
      task.status = 'Completed';
      task.completedAt = new Date();
    } else if (action === 'reject') {
      task.status = 'Assigned';
    } else {
      return res.status(400).json({ message: "action must be 'complete' or 'reject'" });
    }
    await task.save();
    res.json(await populateTask(Task.findById(task._id)));
  } catch (err) {
    fail(res, err);
  }
};

// Admin: close a task that won't be done
export const closeTask = async (req, res) => {
  try {
    const task = await populateTask(
      Task.findOneAndUpdate(
        { _id: req.params.id, status: { $in: ['Open', 'Assigned'] } },
        { status: 'Closed' },
        { new: true }
      )
    );
    if (!task) return res.status(400).json({ message: 'Only open or assigned tasks can be closed.' });
    res.json(task);
  } catch (err) {
    fail(res, err);
  }
};
