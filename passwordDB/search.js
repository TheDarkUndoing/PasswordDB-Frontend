
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

 var response;
  var query = document.getElementById("search-text").value

  con.connect(async function(err,result) {
  if (err) throw err;
  con.query("SELECT passwords FROM password_by_user WHERE username='siapppbx@mail.ru'"+query+"", async function (err, result, fields) {
    if (err) throw err;
    let promise = new Promise(function(resolve, reject) {
      resolve(result, async function () {response = result; });
      return await result
      console.log(result);
      //return result;
    });
    return await result
  });
  return await result
});
//console.log(promise);
}
