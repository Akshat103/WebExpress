const mongoose = require('mongoose');
const {
  capitalizeEachWord,
  capitalizeFullWord,
  toSentenceCase,
  toLowerCaseWholeWord
} = require('../utils/utils');

const resumeSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    required: [true, 'Username is required'],
    unique: true,
    index: true,
    set: toLowerCaseWholeWord
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    set: capitalizeEachWord
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    set: capitalizeEachWord
  },
  about: {
    type: String,
    required: [true, 'About is required'],
    set: toSentenceCase,
  },
  profileImage: {
    type: String,
    required: [true, 'Profile is required'],
  },
  resume: {
    type: String,
    required: [true, 'Resume is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Invalid email format',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: 'Invalid phone number format (10 digits)',
    },
  },
  profiles: {
    type: {
      github: { type: String },
      linkedin: { type: String },
      website: { type: String },
    },
    validate: [
      function (profiles) {
        return profiles.github || profiles.linkedin || profiles.website;
      },
      'At least one profile link is required (Github, LinkedIn, or Website)',
    ],
  },
  education: [
    {
      institution: {
        type: String,
        required: [true, 'Institution is required'],
        set: toSentenceCase
      },
      year: {
        type: Number,
        required: [true, 'Year is required']
      },
      degree: {
        type: String,
        required: [true, 'Degree is required'],
        set: capitalizeFullWord
      },
      grade: {
        type: String,
        required: [true, 'Grade is required']
      },
    },
  ],
  experience: [
    {
      employer: {
        type: String,
        set: capitalizeEachWord
      },
      position: {
        type: String,
        set: capitalizeEachWord
      },
      year: {
        type: Number,
      },
      description: {
        type: String,
        set: capitalizeEachWord
      },
    },
  ],
  skills: [{
    type: String,
    required: [true, 'At least one skill is required'],
    set: capitalizeEachWord
  }],
  projects: [
    {
      name: {
        type: String,
        required: [true, 'Project name is required'],
        set: capitalizeEachWord
      },
      tech: [{
        type: String,
        required: [true, 'At least one technology is required'],
        set: capitalizeEachWord
      }],
      description: {
        type: String,
        required: [true, 'Project description is required'],
        set: toSentenceCase
      },
    },
  ],
});

resumeSchema.index({ user: 1 }, { unique: true, background: false });

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
