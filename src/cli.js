var http = require('http');
var errorBoard = require('./')();

var server = http.createServer(errorBoard.app);
errorBoard.ws.installHandlers(server, {prefix: '/ws'});

var port = '3000';
server.listen(port);
console.log('Listening on port %s', port);
