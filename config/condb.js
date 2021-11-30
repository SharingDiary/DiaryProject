require('dotenv').config()

let connection = require('mysql2').createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Database connected!");
});

module.exports = connection;