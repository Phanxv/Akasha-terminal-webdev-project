const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./database.js");
const notifier = require("node-notifier");
const jwt = require("jsonwebtoken");
require('dotenv').config()

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
        title: "Registration Status",
        message: "Unsuccessful : Username taken",
      });
      res.redirect("/register");
      return res.status(500);
    }
    console.log(result.affectedRows);
    if (result.affectedRows > 0) {
      notifier.notify({
        title: "Registration Status",
        message: "Successful",
      });
      res.redirect("/login");
    } else {
      notifier.notify({
        title: "Registration Status",
        message: "Unsuccessful",
      });
      res.redirect("/register");
    }
  });
});

router.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.pass;
  console.log(`${username} ${password}`);
  let sql = `SELECT * FROM users WHERE userName='${username}';`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      notifier.notify({
        title: "Login Status",
        message: "Unsuccessful : internal server error",
      });
      return res.status(500);
    }
    try {
      console.log(result);
      if (password.localeCompare(result[0].password) == 0) {
        notifier.notify({
          title: "Login Status",
          message: "Successful",
        });
        const token = jwt.sign({
                                username : result[0].userName,
                                userId : result[0].userId,
                              }, process.env.PRIVATE_KEY, { expiresIn: "1h"});
        res.cookie("token", token, {httpOnly: true});
        res.redirect("/knowledge");
      }
      else {
        notifier.notify({
          title: "Login Status",
          message: "Unsuccessful : incorrect password",
        });
        res.redirect("/login")
      }
    } catch (ReferenceError) {
      notifier.notify({
        title: "Login Status",
        message: "Unsuccessful : incorrect username",
      });
      res.redirect("/login")
    }
  });
});

module.exports = router;
