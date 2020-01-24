const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const net = require('net');
let win = null;

function createWindow()
{

   win = new BrowserWindow(
     {
       width:800,
       height:600,
       icon:__dirname+'/img/sock.png',
       show: true,
     })

    win.loadURL(__dirname+"index.html");
    //win.show();
}

function startSocket()
{
  const server = net.createServer((socket) =>
  {
    console.log("listening");

    socket.on('data',(data) =>
    {
      console.log(data.toString('utf-8').replace("\n",""))
      //socket.write("got");
    })
  }
  );
  server.listen(300);
}
function main()
{
  app.on('ready', createWindow);

}
main();
