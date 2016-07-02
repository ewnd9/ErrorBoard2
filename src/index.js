const path = require('path');

const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');

const config = require('./config');
const publicPath = config.publicPath;

const fs = require('fs');
const htmlPath = `${publicPath}/index.html`;
const html = fs.readFileSync(htmlPath, 'utf-8');
const createDb = require('./database');
const createAgent = require('./node-agent/node-agent');

module.exports = function(dbFile, baseUrl = '', forceSSR = false) {
  const app = express();
  const ws = require('./websockets');

  const db = createDb(dbFile);
  const agent = createAgent(db);

  app.use(favicon(path.join(publicPath, 'favicon.ico')));
  app.use(compression());

  app.get('/reports/:type', require('./routes/route-reports')(db));
  app.get('/error', require('./routes/module-logger')(agent));

  app.get('/', (req, res) => res.redirect('messages/'));
  app.use('/', express.static(publicPath));

  if (process.env.NODE_ENV === 'production' || forceSSR) {
    const reactRoute = require('./routes/route-index')(html, baseUrl);

    app.get('/', reactRoute);
    app.use(compression());
    app.use(express.static(publicPath));
    app.get('*', reactRoute);

    app.get('/:type/:id?', reactRoute);
  } else {
    const webpack = require('webpack');
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const wconfig = require('../webpack.config.dev');
    const compiler = webpack(wconfig);
    const middleware = webpackMiddleware(compiler, {
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

  return { app, db, ws, agent };
};
