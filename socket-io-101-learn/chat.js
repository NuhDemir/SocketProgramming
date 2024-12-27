const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8001);
const io = socketio(expressServer);

let users = [];
let groups = {};

// Yeni bir kullanıcı bağlandığında
io.on("connection", (socket) => {
  console.log(socket.id, "has connected");

  // Kullanıcı odaya katıldığında
  socket.on("join", (data) => {
    const user = { id: socket.id, username: data.username };
    users.push(user);
    io.emit("userJoined", { username: data.username });
    io.emit(
      "updateUserList",
      users.map((user) => user.username)
    );
  });

  // Kullanıcı yeni mesaj gönderdiğinde
  socket.on("newMessageToServer", (dataFromClient) => {
    console.log(dataFromClient);
    io.emit("newMessageToClients", dataFromClient);
  });

  // Kullanıcı özel mesaj gönderdiğinde
  socket.on("privateMessage", (data) => {
    const recipientSocket = users.find((user) => user.username === data.to);
    if (recipientSocket) {
      io.to(recipientSocket.id).emit("privateMessage", {
        from: data.from,
        message: data.message,
      });
    }
  });

  // Kullanıcı yazıyor durumunda
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", { username: data.username });
  });

  // Kullanıcı yazmayı durdurduğunda
  socket.on("stopTyping", (data) => {
    socket.broadcast.emit("stopTyping", { username: data.username });
  });

  // Grup oluşturma
  socket.on("createGroup", (groupName) => {
    if (!groups[groupName]) {
      groups[groupName] = [];
      io.emit("groupCreated", groupName);
    }
  });

  // Gruba kullanıcı ekleme
  socket.on("addUserToGroup", ({ groupName, username }) => {
    if (groups[groupName] && !groups[groupName].includes(username)) {
      groups[groupName].push(username);
      io.emit("userAddedToGroup", { groupName, username });
    }
  });

  // Grubu güncelleme
  socket.on("updateGroup", ({ groupName, newGroupName }) => {
    if (groups[groupName]) {
      groups[newGroupName] = groups[groupName];
      delete groups[groupName];
      io.emit("groupUpdated", { oldName: groupName, newName: newGroupName });
    }
  });

  // Grubu silme
  socket.on("deleteGroup", (groupName) => {
    if (groups[groupName]) {
      delete groups[groupName];
      io.emit("groupDeleted", groupName);
    }
  });

  // Mesaja emoji bırakma
  socket.on("addEmojiToMessage", ({ messageId, emoji }) => {
    io.emit("emojiAddedToMessage", { messageId, emoji });
  });

  // Kullanıcı bağlantıyı kestiğinde
  socket.on("disconnect", () => {
    const user = users.find((user) => user.id === socket.id);
    if (user) {
      users = users.filter((user) => user.id !== socket.id);
      io.emit("userLeft", { username: user.username });
      io.emit(
        "updateUserList",
        users.map((user) => user.username)
      );
    }
  });
});
