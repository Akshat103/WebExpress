// controllers/siteController.js
const path = require('path');
const Resume = require('../models/ResumeDataModel');
const { redisClient } = require('../config/redisDb');

const siteController = {
  renderTheme: async (req, res, next) => {
    try {
      const username = req.params.username.toLowerCase();

      let resumeData;
      resumeData = await redisClient.get(`resume:${username}`);
      if (resumeData) resumeData = JSON.parse(resumeData);
      else {
        resumeData = await Resume.findOne({ user: username });
        await redisClient.setEx(`resume:${username}`, 3600, JSON.stringify(resume));
      }

      if (!resumeData) {
        return res.status(404).render('notfound');
      }

      const themeName = resumeData.theme || 'default';
      const themePath = path.join(__dirname, `../views/themes/${themeName}.ejs`);
      try {
        res.render(themePath, { resumeData });
      } catch {
        res.render('error');
      }
    } catch (err) {
      console.log(err)
      res.render('error');
    }
  },
};

module.exports = siteController;