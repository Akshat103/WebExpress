// controllers/formController.js
const formController = {
    index: (req, res) => {
        res.render('form');
    },
    submitForm: (req, res) => {
        // Process form data here
        const formData = req.body;
    
        // Call a function to generate portfolio HTML using formData
        const portfolioHTML = generatePortfolioHTML(formData);
    
        // Assuming you have a middleware that stores user data in req.user
        const user = req.user;
    
        // Assuming you have a function to create a GitHub repository
        createGitHubRepo(user.username, 'portfolio', portfolioHTML)
          .then(repoURL => {
            // Render success page or redirect to the generated portfolio
            res.render('form-success', { repoURL });
          })
          .catch(err => {
            // Handle errors
            console.error(err);
            res.render('form-error');
          });
      },
};

module.exports = formController;
