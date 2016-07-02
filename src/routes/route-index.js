const React = require('react');
const App = require('../client/component-app.jsx');
const app = React.createFactory(App);

module.exports = function(html, baseUrl) {
  return function(req, res) {
    const props = {
      params: req.params,
      pathname: req.path
    };

    const reactHtml = React.renderToString(app(props));
    const result = html
      .replace('<div class="app" id="app"></div>', `<div class="app" id="app">${reactHtml}</div>`)
      .replace('<base href="/">', `<base href="${baseUrl}/">`);
    res.end(result);
  };
};
