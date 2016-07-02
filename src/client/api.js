const request = require('superagent');

let baseUrl = '/';

exports.setBaseUrl = function(url) {
  baseUrl = url;
};

exports.getBaseUrl = function() {
  return baseUrl;
};

exports.fetchReports = function(type, key, callback) {
  request
    .get(`${baseUrl}/reports/${type}`)
    .query(key)
    .set('Accept', 'application/json')
    .end(callback);
};
