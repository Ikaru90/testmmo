const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;

server.listen(port);

mongoose.connect(
  'mongodb://localhost/mmotest',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const User = mongoose.model('Users', { login: String, password: String });
// const test = new User({ login: 'test', password: '1234' });
// test.save().then(() => console.log('user done'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post('/auth', (request, response) => {
  const { login, password } = request.body;
  User.find({ login, password }).then((data) => {
    if (data.length !== 0) {
      const token = jwt.sign({ name: login }, 'secret-key', {
        expiresIn: 2592000 // 30 days
      });
      response.status(200).json({ token });
    } else {
      response.status(200).json({ authentication: false });
    }
  });
});

app.post('/verify', (request, response) => {
  const { token } = request.body;

  jwt.verify(token, 'secret-key', (error, info) => {
    if(error) {
      response.status(200).json({ error });
    } else {
      response.status(200).json({ info });
    }
  });
});

io.sockets.on('connection', (socket) => {
  console.log(`Client connect - ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Client disconnected - ${socket.id}`);
  });
});

console.log(`Server Started at ${port}`);
