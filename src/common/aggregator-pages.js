const aggregate = require('./aggregate');
const reduceTimestamps = require('./reduce-timestamps');
const reduceBrowsers = require('./reduce-browsers');

module.exports = function() {
  return aggregate({
    groupBy: getTitlePage,
    create: function(item) {
      return {
        title: getTitlePage(item),
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

function getTitlePage(data) {
  return data.referer || 'No referer';
}
