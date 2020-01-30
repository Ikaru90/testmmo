import Phaser from 'phaser';
import axios from 'axios';
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

function onLogin() {
  const login = document.getElementById('login').value;
  const password = document.getElementById('password').value;

  axios.post('http://localhost:3000/auth', { login, password }).then((response) => {
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
      const layout = document.getElementById('layout');
      if (layout) {
        layout.hidden = "true";
      }
      verifyJWT(token);
    }
  });

  return false;
};

function verifyJWT(token) {
  axios.post('http://localhost:3000/verify', { token }).then((response) => {
    if (response.data.error) {
      console.log(error);
      localStorage.removeItem('token');
      addedLoginForm(onLogin);
    } else {
      const layout = document.getElementById('layout');
      if (layout) {
        layout.hidden = "true";
      }
      new Phaser.Game(config);
      console.log(`JWT verified. Hello ${response.data.info.name}`);
      socket.on('connect', () => {});
    }
  });
}

const token = JSON.parse(localStorage.getItem('token'));
token ? verifyJWT(token) : addedLoginForm(onLogin);
