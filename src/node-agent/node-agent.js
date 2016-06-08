var moment = require('moment');
var pify = require('pify');

module.exports = function(db) {
  return new Reporter(db);
};

function Reporter(db) {
  this.db = db;
  this._insert = pify(this.db.insert.bind(this.db));
}

Reporter.prototype.reportFromRequest = function(err, ua, referer, meta) {
  var timestamp = Date.now();
  var date = moment(timestamp).format('DD-MM-YYYY');

  var doc = {
      ua: ua,
      referer: referer,
      timestamp: timestamp,
      date: date,

      message: err.message,
      url: err.url,
      line: err.line,
      column: err.column,
      stack: err.stack,

      meta: meta
  };

  return this
      ._insert(doc)
      .then(() => doc);
};

Reporter.prototype.report = function(err) {
  var ua = { family: 'backend' };
  return this.reportFromRequest(err, ua);
};
