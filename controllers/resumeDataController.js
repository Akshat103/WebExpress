const Resume = require('../models/ResumeData');

// Controller functions
const formController = {
  index: (req, res) => {
    res.render('form');
  }
};

const createResume = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { name, email, phone, profiles, education, experience, skills, projects } = req.body;

    let resume = await Resume.findOne({ user: userId });

    if (resume) {
      resume.name = name;
      resume.email = email;
      resume.phone = phone;
      resume.profiles = profiles;
      resume.education = education;
      resume.experience = experience;
      resume.skills = skills;
      resume.projects = projects;
    } else {
      resume = new Resume({
        user: userId,
        name,
        email,
        phone,
        profiles,
        education,
        experience,
        skills,
        projects
      });
    }

    await resume.validate();
    await resume.save();
    
    const message = resume.isNew ? 'Resume created successfully' : 'Resume updated successfully';
    res.status(201).json({ message });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      res.status(400).json({ message: 'Validation failed', errors: validationErrors });
    } else {
      console.error('Error creating/updating resume:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

const getResumeByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const resume = await Resume.findOne({ user: userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: error._message });
  }
};

module.exports = { createResume, getResumeByUserId, formController };
