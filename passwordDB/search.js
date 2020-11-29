
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
    con.query("SELECT count FROM password_count_by_user WHERE username='"+query+"'", async (err, result) =>
    {
      console.log(result);
      if ( result[0] != undefined)
      {
        var count = result[0].count;
        //console.log(passwordList);
        var list_item = document.getElementById('result-item');

        list_item.hidden = false
        list_item.textContent = count+" passwords found for "+query;
        // var entry = document.createElement('li');
        // entry.classList.add("collection-item");
        // entry.appendChild(document.createTextNode(count+" passwords found for "+query));
        // list.appendChild(entry);
        // console.log(count);
        //
        // for(var password in passwordList)
        // {
        //   //console.log(passwordList[password]);
        //   var list = document.getElementById('result');
        //   console.log(list);
        //   var entry = document.createElement('li');
        //   console.log(entry);
        //   entry.classList.add("collection-item");
        //   entry.appendChild(document.createTextNode(passwordList[password]));
        //   list.appendChild(entry);
        //   //document.getElementById("result").innerHTML = result[0].passwords;
        //   console.log(passwordList[password]);
        // }

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
