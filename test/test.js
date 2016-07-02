import test from 'ava';
import 'babel-core/register';

import { agent } from 'supertest';
import createApp from './helpers/create-app';

test.beforeEach(async t => {
  const { server } = await createApp();
  const request = agent(server);

  t.context.server = server;
  t.context.request = request;
});

test.afterEach.always(t => {
  t.context.server.close();
});

test('GET /reports/:type GET /reports/browsers', async t => {
  const { body } = await t.context.request.get('/reports/browsers');

  t.truthy(body.backend.title === 'backend');
  t.truthy(body.backend.count === 1);
});
