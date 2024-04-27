const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/UserModel');
const LastLogin = require('../models/LastLoginModel');
const {redisClient} = require('../config/redisDb');

const authController = {
    setupGitHubStrategy: (passport, req, res) => {
        passport.use(
            new GitHubStrategy(
                {
                    clientID: process.env.CLIENTID,
                    clientSecret: process.env.CLIENTSECRET,
                    callbackURL: process.env.CALLBACKURL,
                },
                async (accessToken, refreshToken, profile, done) => {
                    try {
                        
                        let user = await redisClient.get(`user:${profile.username}`);
                        if(user) user = JSON.parse(user);
                        else{
                            user = await User.findOne({ githubId: profile.id });
                        }

                        if (!user) {
                            user = new User({
                                githubId: profile.id,
                                username: profile.username || 'DefaultUsername',
                                name: profile.displayName || 'DefaultName',
                                profileUrl: profile.profileUrl || '/default-profile-url',
                                photos: profile.photos[0].value || '/assets/images/logo.png'
                            });

                            await user.save();
                        }

                        // Set user in Redis
                        await redisClient.setEx(`user:${user.username}`, 3600, JSON.stringify(user));

                        const lastLogin = new LastLogin({ expiresIn: new Date(Date.now() + 1 * 60 * 60 * 1000), token: accessToken, user: user.username });
                        await lastLogin.save();

                        // Set LastLogin in Redis
                        await redisClient.setEx(`lastLogin:${lastLogin.token}`, 3600, JSON.stringify(lastLogin));

                        return done(null, { user, token: accessToken });
                    } catch (err) {
                        console.error(err);
                        return done(err, null);
                    }

                }
            )
        );
    },
};
module.exports = authController;
