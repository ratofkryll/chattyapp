const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

function addMessageId (data) {
  const message = JSON.parse(data);
  const username = message.username ? message.username : 'Anonymous';
  message.id = uuid();
  return JSON.stringify(message);
}

wss.broadcast = function(data) {
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      const message = addMessageId(data);
      client.send(message);
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
