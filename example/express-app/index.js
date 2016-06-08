'use strict';

require('source-map-support').install();

const http = require('http');
const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.end(`
    <div><a href="/error-board/">Error Board</a></div>
    <div><a href="/throw-error-test/">Throw an Error</a></div>
  `);
});

app.get('/throw-error-test', (req, res) => {
  throw new Error('/throw-error-test');
});

const mount = '/error-board';
const dbFile = __dirname + '/db';

const errorBoard = require('../../dist/backend')(dbFile, mount);
app.use(mount, errorBoard.app);

const server = http.createServer(app);
errorBoard.ws.installHandlers(server, { prefix: `${mount}/ws` });

app.use(function(err, req, res, next) { // always last
  if (!err) {
    return next();
  }

  console.log(err);

  errorBoard.agent.report(err, { family: 'backend' });
  res.status(err.status || 500).json({ status: 'error' });
});

server.listen(port);
console.log('Listening on port %s', port);
