const User = require('../models/UserModel');
const Resume = require('../models/ResumeDataModel');

const profileController = {
    index: async (req, res) => {
        try {
            const username = req.userData.username;
            const user = await User.findOne({ username: username });

            if (!user) {
                let message = "User not found !!!";
                res.render('error', { message });
            }

            const resume = await Resume.findOne({ user: username });

            res.render('profile', { user, resume });
        } catch (error) {
            console.error(error);
            res.render('error');
        }
    }
};

module.exports = profileController;
