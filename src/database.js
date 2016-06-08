var path = require('path');
var NeDB = require('nedb');

module.exports = function(filename) {
  var db = new NeDB({
    filename,
    autoload: true
  });

  db.ensureIndex({
    fieldName: 'timestamp'
  });

  return db;
};
