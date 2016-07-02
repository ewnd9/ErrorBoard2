const aggregate = require('./aggregate');
const reduceTimestamps = require('./reduce-timestamps');
const reduceBrowsers = require('./reduce-browsers');
const getMetaKey = require('./meta-key');

module.exports = function(params) {
  const groupFunction = params.meta ? getMetaKey : getMessage;

  return aggregate({
    groupBy: groupFunction,
    filter: function(item) {
      if (params.meta && !item.meta) {
        return false;
      }

      const referer = item.referer;

      return referer === params.id || (params.id === 'No referer' && !referer);
    },
    create: function(item) {
      return {
        title: groupFunction(item),
        count: 0,
        browsers: []
      };
    },
    each: function(obj, next) {
      obj.count += 1;
      reduceTimestamps(obj, next);
      reduceBrowsers(obj, next);
    }
  });
};

function getMessage(item) {
  return item.message;
}
