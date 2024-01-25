const isAuthenticated = (req, res, next) => {
    // Implement your authentication logic here
    next();
};

module.exports = { isAuthenticated };
