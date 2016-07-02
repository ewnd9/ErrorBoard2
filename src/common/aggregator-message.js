const aggregate = require('./aggregate');
const reduceTimestamps = require('./reduce-timestamps');
const getMetaKey = require('./meta-key');
const getBrowserName = require('./browser-name');
const getMessageSignature = require('./message-signature');

module.exports = function(params) {
  const groupFunction = params.meta ? getMetaKey : getBrowserName;

  return aggregate({
    groupBy: groupFunction,
    filter: function(item) {
      if (params.meta && !item.meta) {
        return false;
      }

      return getMessageSignature(item) === params.id;
    },
    create: function(item) {
      return {
        title: groupFunction(item),
        count: 0,
        stack: item.stack,
        line: item.line,
        url: item.url
      };
    },
    each: function(obj, next) {
      obj.count += 1;
      reduceTimestamps(obj, next);
    }
  });
};
