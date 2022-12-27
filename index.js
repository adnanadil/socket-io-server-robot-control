const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
// const { Server } = require('socket.io')(http, { wsEngine: 'ws' });
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  // cors: {
  //   `origin: "http://localhost:3000",
  //   methods: ["GET", "POST"],
  // },
  cors: {
    // origin: "*",
    origin:'*:*',
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
   },
    allowEIO3: true,
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

  socket.on("send_this", (data) => {
    // socket.to(data.room).emit("receive_message", data);
    socket.broadcast.emit("receive_message", data);
    // io.broadcast.emit("receive_message", data);
  });


  console.log('Connected');
  console.log(socket.id);
  console.log("JWT token test: ",socket.handshake.headers)

  socket.on('disconnect', () => {

    console.log('Disconnected');

  })


});

server.listen(process.env.PORT || 3001, () => {
  console.log("SERVER IS RUNNING");
  console.log(`This is the port: ${process.env.PORT}`);
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
