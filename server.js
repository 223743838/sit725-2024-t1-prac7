var express = require("express");
var app = express();

const client = require('./dbConnection');
let router = require('./routers/router'); 

let http = require ('http').createServer(app);
let io = require ('socket.io')(http);
const {Socket} = require('socket.io');

app.use(express.static(__dirname + '/')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router); 

var port = process.env.port || 3000;
// console.log("App listening to: " + port);
// client.connect(err => {
//     if (err) {
//         console.error('Failed to connect to MongoDB:', err);
//         process.exit(1);
//     } else {
//         console.log('Connected to MongoDB');
//         app.listen(port, () => {
//             console.log("App listening to: " + port);
//         });
//     }
// });


io.on('connection',(socket)=>{
    console.log('User has established his Connection');
    socket.on('disconnect', () => {
        console.log('User was disconnected from connection');
    });
  
    setInterval(()=>{
        socket.emit('number', parseInt(Math.random()*10));
    }, 1000)
  });
  
  
  http.listen(port, ()=>{
    console.log('express server started');
  });
//   console.log("App listening to: " + port);
//   module.exports = app; 