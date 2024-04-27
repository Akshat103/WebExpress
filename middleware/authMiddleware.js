const LastLogin = require('../models/LastLoginModel');
const {redisClient} = require('../config/redisDb');

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
            let lastLogin = await redisClient.get(`lastLogin:${token}`);
            if(lastLogin) lastLogin = JSON.parse(lastLogin);
            else{
                lastLogin = await LastLogin.findOne({ token });
            }

            if (!lastLogin) {
                console.log("Last log in not found")
                return res.status(401).redirect('/auth/github');
            }

            const now = new Date();
            if (lastLogin.expiresIn < now) {
                console.log("Last log in expired")
                return res.redirect('/auth/github');
            }
            
            const username = lastLogin.user.toLowerCase();
            req.userData = { username };

        } catch (error) {
            console.error('Error decoding token:', error);
            return res.redirect('/auth/github');
        }

        next();

    } catch (error) {
        console.error('Error authenticating token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authenticateToken;
