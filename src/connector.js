var mysql = require("mysql");

var createTable = require('./createDatabase')
let data = require('./data')


var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) {
    return console.log("failed to connect to mysql server/ database", err);
  } else {
    createTable(data, con)
    return console.log("connection establish with Datebase!!!!");
  }
});

module.exports = con;
