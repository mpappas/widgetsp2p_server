var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app).listen(8081);
var io = require("socket.io")(server);

app.use(express.static("./public"));

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on("connection", function(socket) {

    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on("chat", function(message) {
        socket.broadcast.emit("message", message);
    });

    socket.emit("message", "Welcome to Cyber Chat");

    socket.on('i am client', console.log);

});



console.log("Starting Socket App - http://localhost:3000");