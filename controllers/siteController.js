// controllers/siteController.js

const path = require('path');
const ResumeData = require('../models/ResumeData');

const siteController = {
  renderTheme: async (req, res, next) => {
    try {
        const username = req.params.username;
        const resumeData = await ResumeData.findOne({ user: username });

      if (!resumeData) {
        return res.status(404).render('notfound');
      }

      const themeName = resumeData.theme || 'default';
      const themePath = path.join(__dirname, `../views/themes/${themeName}.ejs`);
      try{
        res.render(themePath, { resumeData });
      }catch{
        res.render('error');
      }
    } catch (err) {
      res.render('error');
    }
  },
};

module.exports = siteController;