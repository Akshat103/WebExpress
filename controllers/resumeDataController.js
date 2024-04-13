const Resume = require('../models/ResumeDataModel');

// Controller functions
const formController = {
  index: (req, res) => {
    if (!req.userData.resume) res.render('form');
    else res.redirect('/profile');
  }
};

const createResume = async (req, res) => {
  try {
    const { username } = req.userData;
    const resume = req.body;
    const profileImageURI = req.files[0].path.split("public")[1];
    const resumeURI = req.files[1].path.split("public")[1];
    const combinedData = {
      user: username,
      profileImage: profileImageURI,
      resume: resumeURI,
      ...resume
    };
    const newResume = new Resume(combinedData);
    newResume.save()
      .then(savedResume => {
        const message = 'Resume created successfully';
        res.status(201).json({ message });
      })
      .catch(error => {
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
      });

  } catch (error) {
    let message = error.name;
    res.render('error', { message });
  }
};

module.exports = { createResume, formController };
