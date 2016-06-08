var express = require('express');
var useragent = require('useragent');
var moment = require('moment');

module.exports = function(agent) {
  var app = express();
  var ws = require('./../websockets');

  app.use(function(req, res, next) {
      var query = req.query;

      if (!query.message || !query.url) {
          return res.end(400);
      }

      var ua = useragent.parse(req.headers['user-agent']).toJSON();
      var referer = req.headers.referer;

      var meta = query.meta;

      try {
          meta = JSON.parse(meta);
      } catch(e) {
          // Unable to parse JSON metadata, treating it as a string.
      }

      agent
          .reportFromRequest(err, ua, referer, meta)
          .then(dock => {
            try {
                ws.broadcast(JSON.stringify(doc));
            } catch(e) {}

            res.end();
          })
          .catch(err => next(err));
  });

  return app;
};
