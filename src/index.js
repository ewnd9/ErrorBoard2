var path = require('path');

var express = require('express');
var favicon = require('serve-favicon');
var compression = require('compression');

var config = require('./config');
var publicPath = config.publicPath;

var fs = require('fs');
var htmlPath = publicPath + '/index.html';
var html = fs.readFileSync(htmlPath, 'utf-8');
var createDb = require('./database');
var createAgent = require('./node-agent/node-agent');

module.exports = function(dbFile, baseUrl = '') {
  var app = express();
  var ws = require('./websockets');

  var db = createDb(dbFile);
  var agent = createAgent(db);

  app.use(favicon(path.join(publicPath, 'favicon.ico')));
  app.use(compression());

  app.get('/reports/:type', require('./routes/route-reports')(db));
  app.get('/error', require('./routes/module-logger')(agent));

  app.get('/', (req, res) => res.redirect('messages/'));
  app.use('/', express.static(publicPath));

  if (process.env.NODE_ENV === 'production') {
      var reactRoute = require('./routes/route-index')(html, baseUrl);

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

  return { app, ws, agent };
};
