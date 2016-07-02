import http from 'http';
import proxyquire from 'proxyquire';

import createDb from '../../src/database';

export default () => {
  const createApp = proxyquire('../../src/index', {
    './database': () => createDb('test', true)
  });

  const { app, agent, db } = createApp('test', '', true);

  const server = http.createServer(app);
  server.listen();

  return agent
    .report(new Error('error'))
    .then(() => ({ app, server, db }));
};
