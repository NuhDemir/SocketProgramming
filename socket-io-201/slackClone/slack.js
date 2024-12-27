const express = require("express");

const app = express();

const socketio = require("socket.io");

const namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8000);

const io = socketio(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");

  socket.emit("welcome", "Welcome to the socket.io server!");

  socket.on("clientConnect", (data) => {
    console.log("Client connected:", socket.id);
  });

  socket.emit("nsList", namespaces);
});
