const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === wss.OPEN) {
      client.send(data);
    }
  })
}

wss.on('connection', (socket) => {
  console.log('Server: Client connected!');
  console.log(wss.clients.size);
  socket.on('message', function incoming(data) {
    const parsed = JSON.parse(data);
    switch(parsed.type) {
      case 'postMessage':
        const message = {
          type: 'incomingMessage',
          id: uuid(),
          username: parsed.username,
          content: parsed.content
        };
        wss.broadcast(JSON.stringify(message));
        break;
      case 'postNotification':
        const notification = {
          type: 'incomingNotification',
          id: uuid(),
          content: parsed.content
        };
        wss.broadcast(JSON.stringify(notification));
        break
    }
  });
  socket.on('close', () => console.log('Server: Client disconnected!'));
});
