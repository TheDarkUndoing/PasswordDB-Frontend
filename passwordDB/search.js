
var mysql = require('mysql');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./db.ini');

const host = properties.get('db.host')
const user = properties.get('db.user')
const password = properties.get('db.pass')
const database = properties.get('db.database')

var con = mysql.createPool({
  connectionLimit: 5,
  host: host,
  user: user,
  password: password,
  database: database
});

async function searchQuery()
{


  var query =   document.getElementById("search-text").value
  con.getConnection( async (err,connection) =>
  {
    if (err) throw err;
    con.query("SELECT passwords FROM password_by_user WHERE username='"+query+"'", async (err, result) =>
    {
      if ( result[0] != undefined)
      {
        var passwordList = result[0].passwords.split(",");
        //console.log(passwordList);
        for(var password in passwordList)
        {
          //console.log(passwordList[password]);
          var list = document.getElementById('result');
          console.log(list);
          var entry = document.createElement('li');
          console.log(entry);
          entry.classList.add("collection-item");
          entry.appendChild(document.createTextNode(passwordList[password]));
          list.appendChild(entry);
          //document.getElementById("result").innerHTML = result[0].passwords;
          console.log(passwordList[password]);
        }

        //console.log(result[0])
        //console.log("searchQuery ran...")
      }
      else
      {
          //alert("email not found in database")
           M.toast({html: "Email not found"})
      }

    });
    connection.release();
  });

}

async function handleSearch()
{
  //console.log(window.result)
  await searchQuery()
  setTimeout(() =>{document.getElementById("result").innerHTML = window.result[0].passwords;},500);
  console.log("handleSearch ran...")
}
