const express = require("express");
const router = express.Router();
const path = require("path");
var bodyParser = require("body-parser");
var db = require("./database.js");
const notifier = require('node-notifier');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.sendFile("home.html", { root: path.join(__dirname, "./public") });
});

router.get("/about", (req, res) => {
  res.sendFile("about.html", { root: path.join(__dirname, "./public") });
});

router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: path.join(__dirname, "./public") });
});

router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: path.join(__dirname, "./public") });
});

router.get("/knowledge", (req, res) => {
  res.sendFile("knowledge.html", { root: path.join(__dirname, "./public") });
});

router.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.pass;
  console.log(`${username} ${password}`);
  let sql = "INSERT INTO users (username, password) ";
  sql += "VALUES ('" + username + "','" + password + "')";
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      notifier.notify({
        title: 'Registration Status',
        message: 'Unsuccessful : Username taken'
      });
      return res.status(500);
    }
    console.log(result.affectedRows);
    if (result.affectedRows > 0) {
      notifier.notify({
        title: 'Registration Status',
        message: 'Successful'
      });
      res.redirect("/knowledge");
    } else {
      notifier.notify({
        title: 'Registration Status',
        message: 'Unsuccessful'
      });
      res.redirect("/register");
    }
  });
});

module.exports = router;
