const LastLogin = require('../models/LastLoginModel');
const Resume = require('../models/ResumeDataModel');
const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    try {
        if (req.headers.cookie === undefined) {
            return res.status(401).redirect('/auth/github');
        }

        const cookieString = req.headers.cookie;
        const cookies = cookieString.split('; ').reduce((prev, current) => {
            const [name, value] = current.split('=');
            prev[name] = value;
            return prev;
        }, {});
        
        const token = cookies.token;
        try {
            const lastLogin = await LastLogin.findOne({ token });

            if (!lastLogin) {
                console.log("Last log in not found")
                return res.status(401).redirect('/auth/github');
            }

            const now = new Date();
            if (lastLogin.expiresIn < now) {
                console.log("Last log in expired")
                return res.redirect('/auth/github');
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const username = decoded.username;

            const UserResume = Resume.findOne({ user: username });
            let resume;
            if(UserResume) resume = true;
            else resume = false;
            req.userData = { username, resume };
            req.session.username = username;

        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return res.redirect('/auth/github');
        }

        next();

    } catch (error) {
        console.error('Error authenticating token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authenticateToken;
