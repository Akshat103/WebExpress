const LastLogin = require('../models/LastLoginModel');
const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    try {
        if (req.headers.authorization === undefined) {
            return res.status(401).redirect('/auth/github');
        }
        const token = req.headers.authorization.split(' ')[1];

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
