// Express framework'ü dahil ediliyor.
const express = require("express");

// Express uygulaması oluşturuluyor.
const app = express();

// Socket.IO kütüphanesi dahil ediliyor.
const socketio = require("socket.io");

// Statik dosyaların servisi için 'public' klasörü belirtiliyor.
app.use(express.static(__dirname + "/public"));

// Sunucu 8001 portunda dinlemeye başlıyor.
const expressServer = app.listen(8001);

// Socket.IO, Express sunucusuna entegre ediliyor.
const io = socketio(expressServer);

// Yeni bir Socket.IO bağlantısı algılandığında bu kod çalışır.
io.on("connection", (socket) => {
  // Yeni bağlantı yapıldığında socket ID konsola yazdırılıyor.
  console.log(socket.id, "has connected");

  // Sunucu, 'newMessageToServer' adlı bir olay geldiğinde bu işlevi çalıştırır.
  socket.on("newMessageToServer", (dataFromClient) => {
    // Sunucu, istemciden gelen veriyi konsola yazdırır.
    console.log(dataFromClient);

    // Gelen mesajı tüm istemcilere 'newMessageToClients' olayıyla yayınlar.
    io.emit("newMessageToClients", dataFromClient);
  });
});
