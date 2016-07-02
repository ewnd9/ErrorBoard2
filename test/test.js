import test from 'ava';
import 'babel-core/register';

import { agent } from 'supertest';
import createApp from './helpers/create-app';

test.beforeEach(async t => {
  const { server, reporter } = await createApp();
  const request = agent(server);

  t.context.server = server;
  t.context.request = request;
  t.context.reporter = reporter;
});

test.afterEach.always(t => {
  t.context.server.close();
});

test('GET /reports/:type GET /reports/messages', async t => {
  const testError = new Error('Test Error');
  await t.context.reporter.report(testError);

  const { body } = await t.context.request.get('/reports/messages');

  const firstError = body[Object.keys(body)];
  t.truthy(firstError.title === testError.message);
});
