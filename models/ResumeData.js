const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  profiles: {
    github: { type: String },
    linkedin: { type: String }
  },
  education: [{
    institution: { type: String, required: true },
    year: { type: String, required: true },
    degree: { type: String, required: true },
    grade: { type: String, required: true }
  }],
  experience: [{
    employer: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String, required: true }
  }],
  skills: [{ type: String }],
  projects: [{
    name: { type: String, required: true },
    tech: [{ type: String }],
    description: { type: String, required: true }
  }]
});

resumeSchema.index({ user: 1 }, { unique: true, background: false });

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
