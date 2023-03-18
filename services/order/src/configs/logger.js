const moment = require('moment');

const SERVICE_NAME = 'ORDER';

const log = ({ color, level }) => {
  return (message, ...args) => {
    const now = moment().format('HH:mm:ss');
    console.log(color, `[${SERVICE_NAME}] [${level}] [${now}]:`, message, ...args);
  };
};

const logger = {
  info: log({ level: '📃 INFO', color: '\x1b[36m%s\x1b[0m' }),
  log: log({ level: '📜 LOG', color: '\x1b[36m%s\x1b[0m' }),
  error: log({ level: '🐞 ERROR', color: '\x1b[31m%s\x1b[0m' }),
  debug: log({ level: '🟣 DEBUG', color: '\x1b[35m%s\x1b[0m' }),
  warn: log({ level: '⚠️ WARNING', color: '\x1b[33m%s\x1b[0m' })
};

module.exports = logger;
