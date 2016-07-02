const aggregate = require('./aggregate');
const reduceTimestamps = require('./reduce-timestamps');
const reduceBrowsers = require('./reduce-browsers');

module.exports = function() {
  return aggregate({
    groupBy: getTitleScript,
    create: function(item) {
      return {
        title: getTitleScript(item),
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

function getTitleScript(data) {
  return `${data.url}:${data.line || 0}`;
}
