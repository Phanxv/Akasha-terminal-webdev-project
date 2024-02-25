const express = require("express");
const postRouter = express.Router();
const bodyParser = require("body-parser");
const db = require("./database.js");
const notifier = require("node-notifier");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { time } = require("console");
const { title } = require("process");

require("dotenv").config();

postRouter.use(bodyParser.json());
postRouter.use(bodyParser.urlencoded({ extended: true }));

postRouter.post("/register", (req, res) => {
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

postRouter.post("/login", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("userId");
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
        const token = jwt.sign(
          {
            username: result[0].userName,
            userId: result[0].userId,
          },
          process.env.PRIVATE_KEY,
          { expiresIn: "1h" }
        );
        res.cookie("token", token, { httpOnly: true });
        res.cookie("userId", result[0].userId, { httpOnly: true });
        res.redirect("/knowledge");
      } else {
        notifier.notify({
          title: "Login Status",
          message: "Unsuccessful : incorrect password",
        });
        res.redirect("/login");
      }
    } catch (ReferenceError) {
      notifier.notify({
        title: "Login Status",
        message: "Unsuccessful : incorrect username",
      });
      res.redirect("/login");
    }
  });
});

postRouter.get('/fetch', (req, res) => {
  let sql = `SELECT posts.postId, posts.postTitle, posts.postContent, posts.postAttachment,
             users.userName FROM posts INNER JOIN users ON posts.userId = users.userId
             ORDER BY posts.postId DESC;`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      notifier.notify({
        title: "Fetch Status",
        message: "Unsuccessful : internal server error",
      });
      return res.status(500);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

postRouter.post('/fetchSearch', (req, res) => {
  let term = req.body.term;
  let sql = `SELECT posts.postId, posts.postTitle, posts.postContent, posts.postAttachment,
             users.userName FROM posts INNER JOIN users ON posts.userId = users.userId
             WHERE posts.postTitle LIKE '%${term}%'
             ORDER BY posts.postId DESC;`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      notifier.notify({
        title: "Fetch Status",
        message: "Unsuccessful : internal server error",
      });
      return res.status(500);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

const attachmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: attachmentStorage });

postRouter.post("/upload", upload.single("attachment"), (req, res) => {
  let userId = req.cookies.userId;
  let title = req.body.title;
  let content = req.body.contents;
  let sql = "";
  console.log(req.body);
  try {
    console.log(req.file.filename);
    let filename = req.file.filename;
    sql = `INSERT INTO posts(postTitle, postContent, postAttachment, userId) VALUES('${title}', '${content}', '${filename}', '${userId}')`;
    console.log(sql);
  } catch {
    sql = `INSERT INTO posts(postTitle, postContent, userId) VALUES('${title}', '${content}', '${userId}')`;
    console.log(sql);
  }
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      notifier.notify({
        title: "Share Status",
        message: "Unsuccessful : Internal server error",
      });
      res.redirect("/knowledge/share");
      return res.status(500);
    }
    console.log(result.affectedRows);
    if (result.affectedRows > 0) {
      notifier.notify({
        title: "Share Status",
        message: "Successful",
      });
      res.redirect("/knowledge");
    } else {
      notifier.notify({
        title: "Share Status",
        message: "Unsuccessful : Internal server error",
      });
      res.redirect("/knowledge/share");
    }
  });
});

module.exports = postRouter;
