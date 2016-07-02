const _ = require('lodash');

const prop = function(name) {
  return function(obj) {
      return obj[name];
  };
};

const value = function(v) {
  return function() {
    if (_.isObject(v)) {
        return _.cloneDeep(v);
    } else {
        return v;
    }
  };
};

module.exports = function(params) {
  const filter = params.filter || value(true);

  if (_.isString(params.groupBy)) {
    params.groupBy = prop(params.groupBy);
  }

  if (!_.isFunction(params.create)) {
    params.create = value(params.create);
  }

  return function(dataset, next) {
    if (filter(next)) {
      const groupName = params.groupBy(next);
      let item = dataset[groupName];

      if (!item) {
        item = dataset[groupName] = params.create(next);
      }

      params.each(item, next);
    }

    return dataset;
  };
};
