const getEnv = require('~/utils/getEnv');
const jwt = require('jsonwebtoken');
const logger = require('~/configs/logger');
const { USER_ROLES } = require('~/constants/common');
const { ERROR_CODE } = require('~/constants/status-code');

const publicKey = `-----BEGIN PUBLIC KEY-----\n${getEnv('KEYCLOAK_PUBLIC_KEY')}\n-----END PUBLIC KEY-----`;

const authenticate = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  const token = bearerHeader && bearerHeader.startsWith('Bearer ') && bearerHeader.replace('Bearer ', '');

  try {
    if (!token) throw Error('Token not found');

    const decodedToken = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

    if (!decodedToken) {
      throw Error('Token invalid');
    }

    const { realm_access = {} } = decodedToken;
    req.user = decodedToken;
    req.user.roles = realm_access.roles || [];
    req.user.isAdmin = realm_access.roles.includes(USER_ROLES.ADMIN);

    next();
  } catch (err) {
    logger.error(err);
    return res.status(ERROR_CODE.UNAUTHORIZED).json({ msg: err });
  }
};

module.exports = authenticate;
