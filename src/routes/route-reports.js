const _ = require('lodash');
const aggregators = require('../common/aggregators');

module.exports = function(db) {
  return function(req, res) {
    const type = req.params.type;
    const aggregator = aggregators[type];

    if (aggregator) {
      db.find({}, function(err, docs) {
        if (err) {
          res.json(400, { error: err });
        } else {
          res.json(_.reduce(docs, aggregator(req.query), {}));
        }
      });
    } else {
      res.end(400);
    }
  };
};
