const express = require("express");
const http = require("http");

const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Bir kullanıcı bağlandığında
io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı", socket.id);

  //Mesaj alma
  socket.on("send_message", (data) => {
    console.log("Mesaj alındı: " + data);
    //Diğer kullanıcılara mesajı ilet
    socket.broadcast.emit("receive_message", data);
  });

  //Kullanıcı bağlantıyı kestiğinde
  sıcket.on("disconnect", () => {
    console.log("Bir kullanıcı ayrıldı", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server çalışıyor", PORT);
});
