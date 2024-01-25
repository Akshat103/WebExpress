// controllers/authController.js

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

const authController = {
    signIn: (req, res) => {
        res.render('signin');
    },
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
                        const user = await User.findOneAndUpdate(
                            { githubId: profile.id },
                            {
                                $set: {
                                    githubId: profile.id,
                                    username: profile.username || 'DefaultUsername',
                                    name: profile.displayName || 'DefaultName',
                                    profileUrl: profile.profileUrl || '/default-profile-url',
                                    photos: profile.photos[0].value || '/assets/images/logo.png'
                                }
                            },
                            { upsert: true, new: true, useFindAndModify: true }
                        );
                    
                        return done(null, user);
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
