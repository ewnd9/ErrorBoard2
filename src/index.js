var http = require('http');
var path = require('path');

var express = require('express');
var favicon = require('serve-favicon');
var compression = require('compression');

var ws = require('./websockets');

var app = express();
var server = http.createServer(app);

var config = require('./config');

var port = config.port;
var publicPath = config.publicPath;

var fs = require('fs');
var htmlPath = publicPath + '/index.html';
var html = fs.readFileSync(htmlPath, 'utf-8');

app.use(favicon(path.join(publicPath, 'favicon.ico')));
app.use(compression());

app.get('/reports/:type', require('./routes/route-reports'));
app.get('/error', require('./routes/module-logger'));

app.get('/', (req, res) => res.redirect('/messages/'));
app.use('/', express.static(publicPath));

if (process.env.NODE_ENV === 'production') {
    var reactRoute = require('./routes/route-index')(html);

    app.get('/', reactRoute);
    app.use(compression());
    app.use(express.static(publicPath));
    app.get('*', reactRoute);

    app.get('/:type/:id?', reactRoute);
} else {
    var webpack = require('webpack');
    var webpackMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');

    var wconfig = require('../webpack.config.dev');
    var compiler = webpack(wconfig);
    var middleware = webpackMiddleware(compiler, {
      ...wconfig.devServer,
      contentBase: __dirname
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    app.get('*', function response(req, res) {
      middleware.fileSystem
        .createReadStream(htmlPath)
        .pipe(res);
    });
}

ws.installHandlers(server, {prefix: '/ws'});

server.listen(port);
console.log('Listening on port %s', port);

module.exports = server;
