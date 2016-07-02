const http = require('http');
const path = require('path');

const dbFile = path.join(__dirname, '..', 'db');
const errorBoard = require('./')(dbFile);

const server = http.createServer(errorBoard.app);
errorBoard.ws.installHandlers(server, {prefix: '/ws'});

const port = '3000';

server.listen(port);
console.log('Listening on port %s', port);
