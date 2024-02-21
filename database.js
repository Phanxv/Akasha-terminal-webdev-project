const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Delta_006",
  database:"classicmodels",
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