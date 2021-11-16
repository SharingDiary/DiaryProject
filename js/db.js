let mysql = require('mysql');

const db = mysql.createConnection({
    host     : '34.64.209.175',
    user     : 'yih',
    password : 'password!',
    database : 'diaryProject'
});

db.connect(function(err) {
    if(err) throw err;
    console.log("You are connected");
});

module.exports = db;