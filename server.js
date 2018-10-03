const path = require('path');
const express = require('express');
const app = express();

const DIR = 'dist';

// Allow access to build directory
app.use(express.static(DIR));

// Redirect all routes to dist/index.html and then allow react-router to handle it
app.get('/*', (req, res) => {
  const index = path.resolve(__dirname, DIR, 'index.html');
  res.sendFile(index);
});

// Determine port to serve from arguments
// Default to 8080 if package.json is messed up
const port = process.env.npm_package_config_port | 8080;

// Listen to the specified port
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
