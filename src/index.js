const server = require('./socket');

const port = process.env.PORT || 3000;

server.listen(port, '192.168.43.147', () => {
  console.log('Server Started On ', port);
});
