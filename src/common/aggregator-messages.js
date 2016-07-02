const _ = require('lodash');

const aggregate = require('./aggregate');
const reduceTimestamps = require('./reduce-timestamps');
const reduceBrowsers = require('./reduce-browsers');
const getMessageSignature = require('./message-signature');
const filterBy = require('./filter-by');

module.exports = function(params) {
  const filterFunction = (params.filterMetaBy ?
    _.partial(filterBy, params.filterMetaBy) :
    _.constant(true));

    return aggregate({
      groupBy: getMessageSignature,
      filter: filterFunction,
      create: function(item) {
        return {
          title: item.message,
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
