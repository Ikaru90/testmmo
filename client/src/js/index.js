import io from 'socket.io-client';
import Phaser from 'phaser';
import '../css/reset.css';

const socket = io('http://localhost:3000');

const config = {
  type: Phaser.AUTO,
  scale: {
    width: 1280,
    height: 720,
  },
};

new Phaser.Game(config);

socket.on('connect', () => {});
