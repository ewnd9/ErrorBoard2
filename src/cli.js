var http = require('http');
var path = require('path');

var dbFile = path.join(__dirname, '..', 'db');
var errorBoard = require('./')(dbFile);

var server = http.createServer(errorBoard.app);
errorBoard.ws.installHandlers(server, {prefix: '/ws'});

var port = '3000';

server.listen(port);
console.log('Listening on port %s', port);
