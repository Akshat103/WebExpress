// utils/utils.js

const ejs = require('ejs');
const fs = require('fs/promises');

async function generatePortfolioHTML(formData) {
  const templatePath = 'public/assets/themes/templates/terminal-style-portfolio.ejs';
  const templateContent = await fs.readFile(templatePath, 'utf-8');
  const renderedHTML = ejs.render(templateContent, { formData });

  // Assuming you have a path to save the generated HTML
  const outputPath = 'public/generated/index.html';
  await fs.writeFile(outputPath, renderedHTML);

  return outputPath;
}

module.exports = { generatePortfolioHTML };
