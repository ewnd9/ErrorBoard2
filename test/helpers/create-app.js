import http from 'http';
import proxyquire from 'proxyquire';

import createDb from '../../src/database';
import createRepoter from './create-reporter';

export default () => {
  const createApp = proxyquire('../../src/index', {
    './database': () => createDb('test', true)
  });

  const { app, agent, db } = createApp('test', '', true);

  const server = http.createServer(app);
  server.listen();

  const reporter = createRepoter(`http://localhost:${server.address().port}/api/v1`);
  return { app, server, db, reporter };
};
