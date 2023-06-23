const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();



const port = process.env.PORT || 8080;

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection = require("./connector");
const path = require("path")




// function that excecutes sql query
async function executeQuery(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }
     
      resolve(results);
    });
  });
}

const maxLimit = 40 // Total Number of orders
// validate limit and offset values
function validate(limit, offset){

  if(limit === "" || offset === "") return false
  if (!Number.isInteger(Number(limit)) || !Number.isInteger(Number(offset))) return false

  // avoiding negative values
  if(Number(limit) < 0 || Number(offset) < 0) return false
  
  // valid limit value for corresponding offset

  if (Number(limit) + Number(offset) > maxLimit) return false

  return true

}

app.get("/api/orders", async (req, res) => {

  // limit and offset values from url
  const _limit = req.query.limit
  const _offset = req.query.offset
  
  // taking default values for incorrect limit and offset values
  const [limit, offset] = validate(_limit, _offset) ? [Number(_limit), Number(_offset)] : [10,0]
  const sql = "SELECT * FROM orders LIMIT ? OFFSET ?";

  try {
    const results = await executeQuery(sql, [limit, offset]);
    const orders = results.map((row) => ({
      id: row._id,
      title: row.title,
      description: row.description,
    }));
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sorry! Something went wrong" });
  }
});

app.use(express.static('../public'));



app.get('*', (req, res) => {
  res.status(404).json({ error: '404! Not Found' });
})

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app
