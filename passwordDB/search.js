
var mysql = require('mysql');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./db.ini');

const host = properties.get('db.host')
const user = properties.get('db.user')
const password = properties.get('db.pass')
const database = properties.get('db.database')



async function searchQuery()
{
  var con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
  });

  var query = document.getElementById("search-text").value
  var response;
  con.connect( async function(err) {
  if (err) throw err;
  con.query("SELECT passwords FROM password_by_user WHERE username='"+query+"'",  async function (err, result, fields) {
    if (err) throw err;
    response = await result;
// TODO: GET ASYNCROUNOUS CODE WORKING

  });
});
console.log(response);
return response;
//con.end();
}
