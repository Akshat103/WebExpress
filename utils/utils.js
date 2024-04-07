const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define destination folders
const destinationFolders = ['public/uploads', 'public/uploads/userProfiles', 'public/uploads/userResumes'];

// Create destination folders if they don't exist
destinationFolders.forEach(folder => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
});

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let destinationFolder;
      if (file.fieldname === 'profileImage') {
        destinationFolder = 'public/uploads/userProfiles';
      } else if (file.fieldname === 'resume') {
        destinationFolder = 'public/uploads/userResumes';
      } else {
        destinationFolder = 'public/uploads';
      }
      cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
  
const upload = multer({ storage: storage });

function toSentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function toEveryFirstLetterCapital(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

module.exports = {
    toSentenceCase,
    toEveryFirstLetterCapital,
    upload
};
