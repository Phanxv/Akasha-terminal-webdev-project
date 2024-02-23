const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const routes = require('./routes.js');
app.use('/', routes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});