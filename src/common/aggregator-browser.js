const aggregate = require('./aggregate');
const reduceTimestamps = require('./reduce-timestamps');
const getBrowserName = require('./browser-name');
const getMetaKey = require('./meta-key');

module.exports = function(params) {
  const groupFunction = params.meta ? getMetaKey : getMessage;

  return aggregate({
    groupBy: groupFunction,
    filter: function(item) {
      if (params.meta && !item.meta) {
          return false;
      }

      return getBrowserName(item) === params.id;
    },
    create: function(item) {
      return {
        title: groupFunction(item),
        count: 0
      };
    },
    each: function(obj, next) {
      obj.count += 1;
      reduceTimestamps(obj, next);
    }
  });
};

function getMessage(item) {
  return item.message;
}
