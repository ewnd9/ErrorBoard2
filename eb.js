require('./src/require-jsx')();

var config = require('./package.json').config;
var server = require('./src/');

server.listen(config.port);
console.log('Listening on port %s', config.port);

module.exports = server;
