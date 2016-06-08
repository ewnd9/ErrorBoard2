module.exports = function(obj, next) {
    if (next.ua && obj.browsers.indexOf(next.ua.family) === -1) {
        obj.browsers.push(next.ua.family);
    }

    return obj;
};
