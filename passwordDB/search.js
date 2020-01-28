
var mysql = require('mysql');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./db.ini');

const host = properties.get('db.host')
const user = properties.get('db.user')
const password = properties.get('db.pass')
const database = properties.get('db.database')



function searchQuery()
{

  var con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
  });


  var query =   document.getElementById("search-text").value

  return  con.connect( (err,result) => {
  //if (err) throw err;
return con.query("SELECT passwords FROM password_by_user WHERE username='"+query+"'", (err, result) => {
    con.close()
  });
});
}

async function main()
{
  a = await searchQuery()
}
