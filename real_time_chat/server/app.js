const express = require('express');
const sio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUserInRoom, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 8000;

const router = require('./router');

const app = express();

app.use(cors());


const server = http.createServer(app);
const io = sio(server, {
  cors: {
    origin: '*'
  }
});
io.on('connection', (socket) => {
  console.log('We have a new connection');

  socket.on('join', ({ name, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return cb(error);
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined` });
    socket.join(user.room);
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
    cb();
  })

  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, text: getUsersInRoom(user.room) })
    cb();
  })

  socket.on('disconnect', () => {
    console.log('User had left');
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left`})
    }
  })
})

app.use(router);


server.listen(PORT, () => {
  console.log('Server is Listening on port 8000');
})