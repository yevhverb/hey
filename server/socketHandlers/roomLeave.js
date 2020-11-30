module.exports = ({ io, socket, rooms, users }, { userId }) => {
  const roomId = users[userId];
  if (rooms[roomId]) {
    if (rooms[roomId].roomHost !== userId) {
      rooms[roomId].roomUsers = rooms[roomId].roomUsers.filter(
        (u) => u.userId !== userId
      );
      io.to(roomId).emit('room_users_update', {
        isNew: false,
        roomUser: { userId },
      });
    } else {
      io.to(roomId).emit('room_update', null);
      delete rooms[roomId];
    }
    socket.leave(roomId);
    delete users[userId];
  }
};
