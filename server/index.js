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
  const handlers = require('./socketHandlers')({ io, socket, rooms, users });

  socket.on('room_create', handlers.roomCreate);
  socket.on('room_check', handlers.roomCheck);
  socket.on('room_join', handlers.roomJoin);
  socket.on('room_leave', handlers.roomLeave);
  socket.on('room_user_update', handlers.roomUserUpdate);

  peer.on('disconnect', ({ id: userId }) => {
    handlers.roomLeave({ userId });
  });
});
