const moment = require('moment');
const pify = require('pify');

module.exports = function(db) {
  return new Reporter(db);
};

function Reporter(db) {
  this.db = db;
  this._insert = pify(this.db.insert.bind(this.db));
}

Reporter.prototype.reportFromRequest = function(err, ua, referer, meta) {
  const timestamp = Date.now();
  const date = moment(timestamp).format('DD-MM-YYYY');

  const doc = {
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
  const ua = { family: 'backend' };
  return this.reportFromRequest(err, ua);
};
