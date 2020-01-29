
var mysql = require('mysql');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./db.ini');

const host = properties.get('db.host')
const user = properties.get('db.user')
const password = properties.get('db.pass')
const database = properties.get('db.database')



async function searchQuery()
{

  var con = mysql.createPool({
    connectionLimit: 5,
    host: host,
    user: user,
    password: password,
    database: database
  });
  var query =   document.getElementById("search-text").value
  con.getConnection( async (err,connection) =>
  {
    if (err) throw err;
    con.query("SELECT passwords FROM password_by_user WHERE username='"+query+"'", async (err, result) =>
    {
      document.getElementById("result").innerHTML = result[0].passwords;
    });
    connection.destroy();
  });

}

async function handleSearch()
{
  //console.log(window.result)
  await searchQuery()
  setTimeout(() =>{document.getElementById("result").innerHTML = window.result[0].passwords;},500);

}
