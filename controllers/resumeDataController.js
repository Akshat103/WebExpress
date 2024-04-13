const Resume = require('../models/ResumeDataModel');

// Controller functions
const formController = {
  index: (req, res) => {
    res.render('form');
  }
};

const createResume = async (req, res) => {
  try {
    const { username } = req.userData;
    const { name, title, about, email, phone, profiles, education, experience, skills, projects } = req.body;
    const profileImageURI = req.files[0].path.split("public")[1];
    const resumeURI = req.files[1].path.split("public")[1];

    let resume = await Resume.findOne({ user: username });

    if (resume) {
      resume.name = name;
      resume.title = title;
      resume.about = about;
      resume.profileImage = profileImageURI;
      resume.resume = resumeURI;
      resume.email = email;
      resume.phone = phone;
      resume.profiles = profiles;
      resume.education = education;
      resume.experience = experience;
      resume.skills = skills;
      resume.projects = projects;
    } else {
      resume = new Resume({
        user: username,
        name,
        title,
        about,
        profileImage: profileImageURI,
        resume: resumeURI,
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

module.exports = { createResume, formController };
