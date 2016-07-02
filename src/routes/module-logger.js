const express = require('express');
const useragent = require('useragent');

module.exports = function(agent) {
  const app = express();
  const ws = require('../websockets');

  app.use(function(req, res, next) {
    const { body } = req;

    if (!body.message) {
      return res.status(400).end();
    }

    const ua = useragent.parse(req.headers['user-agent']).toJSON();
    const referer = req.headers.referer;

    let meta = body.metaData;

    agent
      .reportFromRequest({ message: body.message, stack: body.stack }, ua, referer, meta)
      .then(doc => {
        try {
          ws.broadcast(JSON.stringify(doc));
        } catch (e) {
          console.log(e);
        }

        res.send({ status: 'ok' });
      })
      .catch(err => next(err));
  });

  return app;
};
