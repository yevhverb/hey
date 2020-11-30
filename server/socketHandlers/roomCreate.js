module.exports = ({ rooms, users }, { userId, roomId }) => {
  users[userId] = roomId;
  rooms[roomId] = { roomHost: userId, roomUsers: [] };
};
