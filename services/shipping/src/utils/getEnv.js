function getEnv(key = '') {
  return process.env[key];
}

module.exports = getEnv;
