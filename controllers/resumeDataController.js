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

    const resume = new Resume({
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

    await resume.save();
    res.status(201).json({ message: 'Resume created successfully' });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ message: error.message });
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
