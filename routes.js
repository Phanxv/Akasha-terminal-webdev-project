const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile('home.html', { root: path.join(__dirname, './public') });
});

router.get('/about', (req, res) => {
  res.sendFile('about.html', { root: path.join(__dirname, './public') });
});

router.get('/register', (req, res) => {
  res.sendFile('register.html', { root: path.join(__dirname, './public') });
});

router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: path.join(__dirname, './public') });
});

router.get('/knowledge', (req, res) => {
  res.sendFile('knowledge.html', { root: path.join(__dirname, './public') });
});

module.exports = router;