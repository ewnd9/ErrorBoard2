const express = require('express');
const useragent = require('useragent');

module.exports = function(agent) {
  const app = express();
  const ws = require('../websockets');

  app.use(function(req, res, next) {
    const query = req.query;

    if (!query.message || !query.url) {
      return res.end(400);
    }

    const ua = useragent.parse(req.headers['user-agent']).toJSON();
    const referer = req.headers.referer;

    let meta = query.meta;

    try {
      meta = JSON.parse(meta);
    } catch (e) {
      console.log(e);
    }

    agent
      .reportFromRequest(query.stack || query.message, ua, referer, meta)
      .then(doc => {
        try {
          ws.broadcast(JSON.stringify(doc));
        } catch (e) {
          console.log(e);
        }

        res.end();
      })
      .catch(err => next(err));
  });

  return app;
};
