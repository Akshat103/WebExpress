// controllers/homeController.js
const homeController = {
    index: (req, res) => {
        res.status(200).render('home');
    }
};

module.exports = homeController;