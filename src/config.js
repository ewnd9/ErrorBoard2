var path = require('path');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'package.json'))).config;;

exports.port = config.port;
exports.dbfile = config.dbfile; 
exports.publicPath = path.join(__dirname, '..', 'public');
