const NeDB = require('nedb');

module.exports = function(filename, inMemoryOnly) {
  const db = new NeDB({
    filename,
    autoload: true,
    inMemoryOnly
  });

  db.ensureIndex({
    fieldName: 'timestamp'
  });

  return db;
};
