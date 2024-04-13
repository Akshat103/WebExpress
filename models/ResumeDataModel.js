const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { 
    type: String,
    ref: 'User', 
    required: [true, 'Username is required'], 
    unique: true, 
    index: true 
  },
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  title: { 
    type: String, 
    required: [true, 'Title is required'] 
  },
  about: { 
    type: String, 
    required: [true, 'About is required'] 
  },
  profileImage: { 
    type: String, 
    required: [true, 'Profile is required'] 
  },
  resume: { 
    type: String, 
    required: [true, 'Resume is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    match: [/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email format'] 
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'], 
    match: [/^[0-9]{10}$/, 'Invalid phone number format (10 digits)'] 
  },
  profiles: {
    github: { type: String },
    linkedin: { type: String },
    website: { type: String }
  },
  education: [{
    institution: { type: String, required: [true, 'Institution is required'] },
    year: { type: String, required: [true, 'Year is required'] },
    degree: { type: String, required: [true, 'Degree is required'] },
    grade: { type: String, required: [true, 'Grade is required'] }
  }],
  experience: [{
    employer: { type: String, required: [true, 'Employer is required'] },
    position: { type: String, required: [true, 'Position is required'] },
    description: { type: String, required: [true, 'Description is required'] }
  }],
  skills: [{ type: String, required: [true, 'At least one skill is required'] }],
  projects: [{
    name: { type: String, required: [true, 'Project name is required'] },
    tech: [{ type: String, required: [true, 'At least one technology is required'] }],
    description: { type: String, required: [true, 'Project description is required'] }
  }]
});

resumeSchema.index({ user: 1 }, { unique: true, background: false });

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
