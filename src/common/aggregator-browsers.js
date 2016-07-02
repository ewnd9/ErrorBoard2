const aggregate = require('./aggregate');
const reduceTimestamps = require('./reduce-timestamps');
const getBrowserName = require('./browser-name');

module.exports = function() {
  return aggregate({
    groupBy: getBrowserName,
    create: function(item) {
      return {
        title: getBrowserName(item),
        count: 0
      };
    },
    each: function(obj, next) {
      obj.count += 1;
      reduceTimestamps(obj, next);
    }
  });
};
