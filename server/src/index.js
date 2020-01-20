const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;

server.listen(port);

io.sockets.on('connection', (socket) => {
  console.log(`Client connect - ${socket.id}`);
  socket.on('jwt_request', (credentials) => {
    const token = jwt.sign({ name: credentials.username }, 'secret-key', {
      expiresIn: 2592000 // 30 days
    });
    socket.emit('jwt_response', { token });
  });
  socket.on('jwt_verify_request', (token) => {
    jwt.verify(token.token, 'secret-key', (error, info) => {
      if(error) {
        socket.emit('jwt_verify_response', { error });
      } else {
        socket.emit('jwt_verify_response', { info });
        console.log(`Authorized - ${socket.id}`);
      }
    });
  });
  socket.on('disconnect', () => {
    console.log(`Client disconnected - ${socket.id}`);
  });
});

console.log(`Server Started at ${port}`);
