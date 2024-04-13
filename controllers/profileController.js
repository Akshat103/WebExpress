const User = require('../models/UserModel');
const Resume = require('../models/ResumeDataModel');

const profileController = {
    index: async (req, res) => {
        try {
            const username = req.userData.username;
            const user = await User.findOne({ username: username });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const resume = await Resume.findOne({ user: username });

            if (!resume) {
                return res.status(404).json({ message: 'Resume not found' });
            }

            res.render('profile', { user, resume });
        } catch (error) {
            console.error(error);
            res.render('error');
        }
    }
};

module.exports = profileController;
