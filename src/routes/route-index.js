var React = require('react');
var App = require('../client/component-app.jsx');
var app = React.createFactory(App);

module.exports = function(html, baseUrl) {
  return function(req, res) {
      var props = {
          params: req.params,
          pathname: req.path
      };

      var reactHtml = React.renderToString(app(props));
      var result = html
          .replace('<div class="app" id="app"></div>', `<div class="app" id="app">${reactHtml}</div>`)
          .replace('<base href="/">', `<base href="${baseUrl}/">`);
      res.end(result);
  };
};
