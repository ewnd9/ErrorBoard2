function metaKey(data) {
  const meta = data.meta;

  if (typeof meta === 'string') {
    return meta;
  } else {
    return JSON.stringify(meta);
  }
}

module.exports = metaKey;
