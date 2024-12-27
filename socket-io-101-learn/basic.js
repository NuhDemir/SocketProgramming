const express = require("express");

const app = express();

const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8000);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");
  socket.emit("multipleMessages", {
    messageFromServer: "socket.io sunucusuna hoşgeldiniz!",
    anotherEvent: "Bu mesajı sadece sen görebilirsin!",
  });
});
