const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

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

const { jwtAuth } = require("./jwtAuth.js");

router.get("/knowledge", jwtAuth,(req, res) => {
  res.sendFile("knowledge.html", { root: path.join(__dirname, "./private") });
});

router.get("/knowledge/share", jwtAuth,(req, res) => {
  res.sendFile("share.html", { root: path.join(__dirname, "./private")})
})

router.get("/knowledge/css/styles.css", jwtAuth, (req, res) =>{
  res.sendFile("styles.css", { root: path.join(__dirname, "./private/css")})
})

router.get("/storage/:file", jwtAuth, (req, res) => {
  res.sendFile(`${req.params.file}` , { root: path.join(__dirname, "./storage")})
})

const postRouter = require('./post-api.js');
router.use('/', postRouter);

module.exports = router;
