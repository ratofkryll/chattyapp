const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

// Initial user counter
let num = 0;

// Sends data to client
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
  // Increments online users counter
  num++;
  wss.broadcast(JSON.stringify(num));

  // Catches incoming messages & notifications, and adds and ID
  socket.on('message', function incoming(data) {
    const parsedData = JSON.parse(data);
    if (parsedData.type === 'postMessage') {
      const message = {
        type: 'incomingMessage',
        id: uuid(),
        username: parsedData.username,
        content: parsedData.content
      }
      wss.broadcast(JSON.stringify(message));
    } else if (parsedData.type === 'postNotification') {
      const notification = {
        type: 'incomingNotification',
        id: uuid(),
        username: parsedData.username,
        content: parsedData.content
      }
      wss.broadcast(JSON.stringify(notification));
    } else {
      console.log('Error: Unknown type: ', parsedData.type);
    }
  });

  // Decrements online users counter
  socket.on('close', () => {
    num--;
    wss.broadcast(JSON.stringify(num));
  });
});
