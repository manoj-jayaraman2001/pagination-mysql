
var mysql = require('mysql');



var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});



const fs = require('fs');
const script = fs.readFileSync('createDatabase.js', 'utf8');

connection.query(script, (error, results) => {
  if (error) throw error;
  console.log('Script executed successfully');
  // Proceed with deployment
});

module.exports = con;