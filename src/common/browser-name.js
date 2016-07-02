module.exports = function(data) {
  const ua = data.ua;

  if (ua && ua.family && ua.major) {
    return `${ua.family} ${ua.major}${ua.minor ? `.${ua.minor}` : ''}`;
  } else if (ua && ua.family) {
    return ua.family;
  } else {
    return 'Unknown';
  }
};
