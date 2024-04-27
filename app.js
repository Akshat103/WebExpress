const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const { connectDB } = require('./config/mongoDb');
const {connectRedis} = require('./config/redisDb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');

// Connect to MongoDB
connectDB();
connectRedis();

// Routes
const homeRoutes = require('./routes/homeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const authRoutes = require('./routes/authRoutes');
const resumeDataRoutes = require('./routes/resumeDataRoutes');
const errorRoutes = require('./routes/errorRoutes');
const siteRoutes = require('./routes/siteRoutes');

app.use('/', homeRoutes);
app.use('/', profileRoutes);
app.use('/auth', authRoutes);
app.use('/', resumeDataRoutes);
app.use('/', errorRoutes);
app.use('/', siteRoutes);

// Handle undefined routes (404)
app.use((req, res) => {
    res.status(404).render('notfound');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
