const sockjs = require('sockjs');
const ws = sockjs.createServer();

const _clients = {};

ws.on('connection', function(c) {
  _clients[c.id] = c;

  c.on('close', function() {
    delete _clients[c.id];
  });
});

ws.broadcast = function(message) {
  for (let cid in _clients) {
    _clients[cid].write(message);
  }
};

module.exports = ws;
