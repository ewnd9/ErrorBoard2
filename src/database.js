const NeDB = require('nedb');

module.exports = function(filename) {
  const db = new NeDB({
    filename,
    autoload: true
  });

  db.ensureIndex({
    fieldName: 'timestamp'
  });

  return db;
};
