const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function (data) {
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(data);
    } else {
      client.terminate();
    }
  });
}

wss.on('connection', (socket) => {
  console.log('Server: Client connected!');

  socket.on('message', function incoming(data) {
    const parsed = JSON.parse(data);
    console.log(parsed);
    if (parsed.type === 'postMessage') {
      const message = {
        type: 'incomingMessage',
        id: uuid(),
        username: parsed.username,
        content: parsed.content
      };
      wss.broadcast(JSON.stringify(message));
    } else if (parsed.type === 'postNotification') {
      const notification = {
        type: 'incomingNotification',
        id: uuid(),
        username: parsed.username,
        content: parsed.content
      };
      wss.broadcast(JSON.stringify(notification));
    } else {
      console.log('Error: Unknown type: ', parsed.type);
    }
  });
  socket.on('close', () => console.log('Server: Client disconnected!'));
});
