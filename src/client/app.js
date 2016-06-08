var page = require('page');
var React = require('react');

var _baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
var baseUrl = _baseUrl.substr(0, _baseUrl.length - 1);

var api = require('./api');
api.setBaseUrl(baseUrl);

var Reports = require('./reports');
var App = require('./component-app.jsx');
var app = React.createFactory(App);

var _context;
var updateApp = function(ctx) {
    var rootNode = document.getElementById('app');

    if (ctx) {
        _context = ctx;
    }

    var props = {
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
    var ws = new SockJS(`${baseUrl}/ws`);

    ws.onmessage = function(e) {
        Reports.update(JSON.parse(e.data));
        updateApp();
    };
} catch (e) {
    // TODO: Add SockJS fail notification.
}
