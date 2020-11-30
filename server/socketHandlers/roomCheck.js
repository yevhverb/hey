module.exports = ({ socket, rooms }, { roomId }) => {
  socket.emit('room_status', { roomStatus: Boolean(rooms[roomId]) });
};
