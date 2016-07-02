#!/usr/bin/env node

process.env.NODE_ENV = 'production';

const http = require('http');
const path = require('path');

const dbFile = process.argv[2];

if (!dbFile) {
  console.error(`Usage: error-board <db-path>`);
  process.exit(1);
}

const errorBoard = require('./dist/backend')(dbFile);

const server = http.createServer(errorBoard.app);
errorBoard.ws.installHandlers(server, {prefix: '/ws' });

const port = '3000';

server.listen(port);
console.log('Listening on port %s', port);
