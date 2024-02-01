// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const User = require('../models/User');

// Initialize Passport
router.use(passport.initialize());
router.use(passport.session());

// GitHub OAuth Configuration
authController.setupGitHubStrategy(passport);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// GitHub OAuth route
router.get('/github', passport.authenticate('github'));

// GitHub callback route
router.get('/github/callback', (req, res, next) => {
    passport.authenticate('github', { failureRedirect: '/error' }, (err, user) => {
        if (err) {
            console.error(err);
            return res.redirect('/error');
        }

        if (!user) {
            return res.redirect('/error');
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return res.redirect('/error');
            }

            res.send('<script>window.sessionStorage.setItem("loggedIn", true); window.location.href = "/";</script>');
        });
    })(req, res, next);
});

// Route to handle sign-out request
router.post('/signout', (req, res) => {
    console.log('User signed out.');
    res.status(200).send('Sign-out request received.');
});

module.exports = router;
