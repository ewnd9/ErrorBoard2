const aggregate = require('./aggregate');
const getMetaKey = require('./meta-key');
const reduceTimestamps = require('./reduce-timestamps');

module.exports = function() {
  return aggregate({
    groupBy: getMetaKey,
    filter: function(item) {
      return typeof item.meta !== 'undefined';
    },
    create: function(item) {
      return {
        title: getMetaKey(item),
        count: 0
      };
    },
    each: function(obj, next) {
      obj.count += 1;
      reduceTimestamps(obj, next);
    }
  });
};
