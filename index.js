const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // `origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    // socket.to(data.room).emit("receive_message", data);
    socket.broadcast.emit("receive_message", data);
    // io.broadcast.emit("receive_message", data);
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log("SERVER IS RUNNING");
});


/*
var PORT = process.env.PORT || 3001;
var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(PORT, function () {
    console.log('listening on *:' + PORT);
}
);

var io = require('socket.io')(server);

io.on('connect', function (socket) {

    console.log('a user connected');



    socket.on('message', function (data) {
        console.log(data);
        io.emit('message', data);
    });

});
*/
