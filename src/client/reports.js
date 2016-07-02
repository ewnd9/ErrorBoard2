const _ = require('lodash');
const vow = require('vow');
const api = require('./api');
const aggregators = require('../common/aggregators');

const _reports = {};

const getKey = function(params) {
  return _.reduce(params, function(result, value, key) {
    if (value === null) {
      return result;
    }

    if (value === false) {
      value = '';
    }

    return `${result}&${key}=${encodeURIComponent(value)}`;
  }, '');
};

const getParams = function(key) {
  return _.reduce(key.substr(1).split('&'), function(params, pair) {
    const p = pair.split('=');

    params[p[0]] = decodeURIComponent(p[1]);

    return params;
  }, {});
};

module.exports = {
  fetch: function(type, params) {
    const key = getKey(params);
    const deferred = vow.defer();

    if (!_reports[type]) {
      _reports[type] = {};
    }

    if (_reports[type][key]) {
      deferred.resolve(_reports[type][key]);
    } else {
      api
      .fetchReports(type, key, function(res) {
        if (res.ok) {
          deferred.resolve(_reports[type][key] = res.body);
        } else {
          deferred.reject(res.text);
        }
      });
    }

    return deferred.promise();
  },
  get: function(type, params) {
    return (_reports[type] && _reports[type][getKey(params)]) || null;
  },
  update: function(item) {
    for (let type in _reports) {
      const aggregator = aggregators[type];

      if (aggregator) {
        for (let key in _reports[type]) {
          _reports[type][key] = aggregator(getParams(key))(_reports[type][key], item);
        }
      }
    }
  }
};
