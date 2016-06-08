var http = require('http');
var path = require('path');

var express = require('express');
var favicon = require('serve-favicon');
var compression = require('compression');

var ws = require('./websockets');

var app = express();
var server = http.createServer(app);

var publicPath = path.join(__dirname, '..', 'public');

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.use(favicon(path.join(publicPath, 'favicon.ico')));
app.use(compression());

app.use('/static', express.static(publicPath));

app.get('/reports/:type', require('./routes/route-reports'));
app.get('/error', require('./routes/module-logger'));
app.get('/:type/:id?', require('./routes/route-index'));

app.get('/', (req, res) => res.redirect('/messages/'));

ws.installHandlers(server, {prefix: '/ws'});

module.exports = server;

var config = require('../package.json').config;

server.listen(config.port);
console.log('Listening on port %s', config.port);
