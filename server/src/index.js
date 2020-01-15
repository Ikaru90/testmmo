const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port);

io.sockets.on('connection', (socket) => {
  console.log(`client connected ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`client disconnected ${socket.id}`);
  });
});

console.log(`Server Started at ${port}`);
