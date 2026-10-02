import mongoose from 'mongoose';

// Flow: Open → (admin assigns) Assigned → (volunteer submits proof) Submitted
//       → (admin) Completed, or back to Assigned with a reviewMessage. Admin can Close an Open/Assigned task.
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, default: '' },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ['Open', 'Assigned', 'Submitted', 'Completed', 'Closed'],
      default: 'Open',
    },
    interested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    proofImage: { type: String, default: '' },
    submissionNote: { type: String, default: '' },
    submittedAt: { type: Date },
    reviewMessage: { type: String, default: '' },
    completedAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
