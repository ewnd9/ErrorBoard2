const page = require('page');
const React = require('react');

const _baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const baseUrl = _baseUrl.substr(0, _baseUrl.length - 1);

const api = require('./api');
api.setBaseUrl(baseUrl);

const Reports = require('./reports');
const App = require('./component-app.jsx');
const app = React.createFactory(App);

let _context;

const updateApp = function(ctx) {
  const rootNode = document.getElementById('app');

  if (ctx) {
    _context = ctx;
  }

  const props = {
    state: _context.state,
    params: _context.params,
    pathname: _context.pathname
  };

  React.render(app(props), rootNode);
};

page(`${baseUrl}/:type/:id?`, updateApp);

document.addEventListener('DOMContentLoaded', page.start);

// Establish Websocket connection.
try {
  /* global SockJS */
  const ws = new SockJS(`${baseUrl}/ws`);

  ws.onmessage = function(e) {
    Reports.update(JSON.parse(e.data));
    updateApp();
  };
} catch (e) {
  // TODO: Add SockJS fail notification.
}
