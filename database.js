const mysql = require("mysql");
require('dotenv').config()
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database:"akasha",
  multipleStatements: true
});
connection.connect(function(err){
   if(!err){
       console.log("Connected");
   }else{
       console.log(`Connection failed ${err}`);
   }
});
module.exports = connection;