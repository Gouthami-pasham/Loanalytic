var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:"loanalytic"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*con.query("SELECT * from tb_user", function (err, result) {
    if (err) throw err;
    console.log(result);
  });*/
});

module.exports=con;