const { Server } = require('socket.io');
const http = require('http');
const app = require('../server');

const server = http.createServer(app);
const io = new Server(server);

const userMessageHandler = (respond = io) => {
  return (message, callback) => {
    respond.broadcast.emit('user/newMessage', message);
    callback({ ok: true, message });
  };
};

io.on('connection', (socket) => {
  socket.emit('status/Connection', {
    connected: true,
  });

  socket;

  socket.on('user/Message', userMessageHandler(socket));
});

module.exports = server;
