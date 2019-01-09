const express = require('express');
const SocketServer = require('ws').Server;

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function(data) {
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      console.log('Server: Broadcast!')
      client.send(data);
    } else {
      client.terminate();
    }
  })
}

wss.on('connection', (socket) => {
  console.log('Server: Client connected!');
  socket.on('message', wss.broadcast);
  socket.on('close', () => console.log('Server: Client disconnected!'));
});
