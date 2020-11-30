module.exports = ({ io, rooms }, { roomId, ...roomUser }) => {
  const userIndex = rooms[roomId].roomUsers.findIndex(
    (user) => user.userId === roomUser.userId
  );
  if (userIndex > -1) {
    rooms[roomId].roomUsers.splice(userIndex, 1, roomUser);
    io.to(roomId).emit('room_user_update', roomUser);
  }
};
