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

      const url = item.url;
      const line = item.line || 0;

      return (`${url}:${line}`) === params.id;
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
