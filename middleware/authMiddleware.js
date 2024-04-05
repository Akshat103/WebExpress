const LastLogin = require('../models/LastLoginModel');
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
                return res.status(401).redirect('/auth/github');
            }

            const now = new Date();
            if (lastLogin.expiresIn < now) {
                return res.redirect('/auth/github');
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;
            req.userData = { userId };

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
