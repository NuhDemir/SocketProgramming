import { User } from "../models/User.js";
import { Message } from "../models/Message.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`Kullanıcı bağlandı: ${socket.id}`);

    // Özel mesaj
    socket.on("private-message", async ({ senderId, receiverId, content }) => {
      const message = new Message({
        sender: senderId,
        receiver: receiverId,
        content,
      });
      await message.save();
      socket.to(receiverId).emit("receive-message", message);
    });

    // Grup mesajı
    socket.on("group-message", async ({ senderId, groupId, content }) => {
      const message = new Message({
        sender: senderId,
        group: groupId,
        content,
      });
      await message.save();
      socket.to(groupId).emit("receive-message", message);
    });

    // Bağlantı kesildiğinde durum güncelleme
    socket.on("disconnect", async () => {
      await User.findOneAndUpdate(
        { socketId: socket.id },
        { status: "offline" }
      );
      console.log(`Kullanıcı ayrıldı: ${socket.id}`);
    });
  });
};
