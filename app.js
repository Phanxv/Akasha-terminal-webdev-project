const express = require('express');
const app = express();
const path = require('path');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const routes = require('./routes.js');
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});