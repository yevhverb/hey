module.exports = ({ io, socket, rooms, users }, { roomId, ...roomUser }) => {
  if (rooms[roomId]) {
    users[roomUser.userId] = roomId;
    rooms[roomId].roomUsers.unshift(roomUser);
    io.to(roomId).emit('room_users_update', { isNew: true, roomUser });
    socket.emit('room_update', { roomId, ...rooms[roomId] });
    socket.join(roomId);
  } else {
    socket.emit('room_update', null);
  }
};
