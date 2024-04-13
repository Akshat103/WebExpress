const express = require('express');
const { connectDB, redisClient } = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Connect to MongoDB
connectDB();

// Routes
const homeRoutes = require('./routes/homeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const authRoutes = require('./routes/authRoutes');
const resumeDataRoutes = require('./routes/resumeDataRoutes');
const errorRoutes = require('./routes/errorRoutes');
const siteRoutes = require('./routes/siteRoutes');

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3600000,
    },
}));

app.use('/', homeRoutes);
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);
app.use('/', resumeDataRoutes);
app.use('/error', errorRoutes);
app.use('/', siteRoutes);

// Handle undefined routes (404)
app.use((req, res) => {
    res.status(404).render('notfound');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
