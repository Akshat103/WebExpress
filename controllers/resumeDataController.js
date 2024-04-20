const Resume = require('../models/ResumeDataModel');
const { containerClient } = require('../config/azureStorage');
const upload = require('../config/multerConfig');

// Function to upload file to Azure Storage
async function uploadToAzureStorage(file) {
  const blobName = `${Date.now()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.uploadData(file.buffer);
  return blockBlobClient.url;
}

// Controller functions
const formController = {

  index: async (req, res) => {
    try {
      const resume = await Resume.findOne({ user: req.userData.username });
      if (!resume) res.render('form');
      else res.redirect('/profile');
    }
    catch {
      console.error(err);
      res.render('error');
    }
  },

  updatePage: async (req, res) => {
    try {
      const username = req.userData.username;
      const resume = await Resume.findOne({ user: username });
      if (resume) {
        res.render('update', { resume });
      }
      else {
        let message = "Data not found !!!";
        res.render('error', { message });
      }
    } catch (err) {
      console.error(err);
      res.render('error');
    }
  },

  updateResume: async (req, res) => {
    try {
      const { username } = req.userData;
      const resumeData = req.body;
      let profileImageURI;
      let resumeURI;
      let updatedData = { ...resumeData };

      if (req.files && req.files.length > 0) {
        for (var file of req.files) {
          if (file.fieldname === 'profileImage') {
            profileImageURI = await uploadToAzureStorage(file);
          } else if (file.fieldname === 'resume') {
            resumeURI = await uploadToAzureStorage(file);
          }
        }

        if (profileImageURI) {
          updatedData.profileImage = profileImageURI;
        }
        if (resumeURI) {
          updatedData.resume = resumeURI;
        }
      }

      const updatedResume = await Resume.findOneAndUpdate({ user: username }, updatedData, { new: true });

      if (!updatedResume) {
        let message = "Resume not found !!!";
        return res.status(404).render('error', { message });
      }

      const message = 'Resume updated successfully';
      res.status(200).json({ message });

    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        for (const field in error.errors) {
          validationErrors[field] = error.errors[field].message;
        }
        res.status(400).json({ message: 'Validation failed', errors: validationErrors });
      } else {
        console.error('Error updating resume:', error);
        res.status(500).json({ message: error.message });
      }
    }
  },

  createResume: async (req, res) => {
    try {
      const { username } = req.userData;
      const resume = req.body;
      const profileImageURI = await uploadToAzureStorage(req.files[0]);
      const resumeURI = await uploadToAzureStorage(req.files[1]);
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
      console.log(error)
      let message = error.name;
      res.render('error', { message });
    }
  }
};

module.exports = { formController };
