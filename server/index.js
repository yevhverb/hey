const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const peer = require('peer').ExpressPeerServer(server);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 4000;

app.use('/api/peer', peer);

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(PORT);

const rooms = {};
const users = {};

io.on('connection', (socket) => {
  socket.on('room_create', ({ userId, roomId }) => {
    users[userId] = roomId;
    rooms[roomId] = { roomHost: userId, roomUsers: [] };
  });

  socket.on('room_join', ({ roomId, userId, userName, userEmoji }) => {
    if (rooms[roomId]) {
      users[userId] = roomId;
      rooms[roomId].roomUsers.unshift({ userId, userName, userEmoji });
      io.to(roomId).emit('room_update_users', {
        isNew: true,
        roomUser: { userId, userName, userEmoji },
      });
      socket.emit('room_update', { roomId, ...rooms[roomId] });
      socket.join(roomId);
    } else {
      socket.emit('room_update', null);
    }
  });

  socket.on('room_check', ({ roomId }) => {
    socket.emit('room_status', { roomStatus: Boolean(rooms[roomId]) });
  });

  socket.on('room_leave', ({ userId }) => {
    const roomId = users[userId];
    if (rooms[roomId]) {
      if (rooms[roomId].roomHost !== userId) {
        rooms[roomId].roomUsers = rooms[roomId].roomUsers.filter(
          (u) => u.userId !== userId
        );
        io.to(roomId).emit('room_update_users', {
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
  });
});

peer.on('disconnect', ({ id: userId }) => {
  const roomId = users[userId];
  if (rooms[roomId]) {
    if (rooms[roomId].roomHost !== userId) {
      rooms[roomId].roomUsers = rooms[roomId].roomUsers.filter(
        (u) => u.userId !== userId
      );
      io.to(roomId).emit('room_update_users', {
        isNew: false,
        roomUser: { userId },
      });
    } else {
      io.to(roomId).emit('room_update', null);
      delete rooms[roomId];
    }
    delete users[userId];
  }
});
