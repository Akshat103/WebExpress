// controllers/siteController.js

const path = require('path');
// const ResumeData = require('../models/ResumeData');

const siteController = {
  renderTheme: async (req, res, next) => {
    try {
    //   const username = req.params.username;
    //   const resumeData = await ResumeData.findOne({ userId: username });

      if (!resumeData) {
        return res.status(404).render('notfound');
      }

      const themeName = resumeData.theme || 'default';
      const themePath = path.join(__dirname, `../views/themes/${themeName}.ejs`);
      res.render(themePath, { resumeData });
    } catch (err) {
      next(err);
    }
  },
};

const resumeData = {
    name: "Your Full Name",
    title: "Your Job Title",
    email: "your_email@example.com",
    phoneNumbers: ["(123) 456-7890", "(987) 654-3210"],
    website: "www.yourwebsite.com",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
      twitter: "https://twitter.com/your_twitter_handle",
      github: "https://github.com/your-github-username",
    },
    education: [
      {
        institute: "School Name",
        degree: "Degree",
        duration: "Start Year - End Year",
        grades: "GPA or Achievements",
      },
      // ...other education entries
    ],
    projects: [
      {
        name: "Project Name",
        link: "https://project-website.com",
        technologies: "Technology 1, Technology 2",
        description: "Project description",
        role: "Your Role",
        date: "Start Date - End Date",
      },
      // ...other projects
    ],
    awards: [
      {
        name: "Award Name",
        certificateLink: "https://award-certificate-link.com", // Replace with actual link
        issuer: "Award Issuer", // Optional
        date: "Year Awarded", // Optional
      },
      // ...other awards
    ],
    summary: "Your interests and passions", // Replacing "interests"
    resumeLink: "https://drive.google.com/file/d/your-resume-file-id/view?usp=sharing", // Optional
  };

module.exports = siteController;
