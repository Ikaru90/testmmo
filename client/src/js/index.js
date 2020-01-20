import Phaser from 'phaser';
import io from 'socket.io-client';
import { addedLoginForm } from './loginForm';
import '../css/main.css';

const socket = io('http://localhost:3000');

const config = {
  type: Phaser.AUTO,
  scale: {
    width: 1280,
    height: 720,
  },
};

socket.on('connect', () => {
  const token = JSON.parse(localStorage.getItem('token'));

  token ? socket.emit('jwt_verify_request', token) : addedLoginForm(socket);

  socket.on('jwt_response', (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    socket.emit('jwt_verify_request', token);
  });
  socket.on('jwt_verify_response', ({ info, error }) => {
    if (error) {
      console.log(error);
      localStorage.removeItem('token');
      addedLoginForm(socket);
    } else {
      const layout = document.getElementById('layout');
      if (layout) {
        layout.hidden = "true";
      }
      new Phaser.Game(config);
      console.log(`JWT verified. Hello ${info.name}`);
    }
  });
});
