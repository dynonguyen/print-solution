import jwt from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import logger from '~/config/logger';
import { USER_ROLES } from '~/constants/common';
import { ExpressContext, UserInfo } from '~/types/common';
import getEnv from '~/utils/getEnv';

const publicKey = `-----BEGIN PUBLIC KEY-----\n${getEnv('KEYCLOAK_PUBLIC_KEY')}\n-----END PUBLIC KEY-----`;

const authChecker: AuthChecker<ExpressContext> = ({ context }, roles) => {
  const { req } = context;

  // Check if the connection is from other services
  if (req.headers.authorization === getEnv('API_KEY')) {
    return true;
  }

  const bearerHeader = req.headers.authorization;
  const token = bearerHeader && bearerHeader.startsWith('Bearer ') && bearerHeader.replace('Bearer ', '');

  if (!token) {
    logger.error('Token not found');
    return false;
  }

  const decodedToken = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as UserInfo | undefined;

  if (!decodedToken) {
    logger.error('Token invalid');
    return false;
  }

  const { realm_access } = decodedToken;
  req.user = decodedToken;
  req.user.roles = realm_access.roles || [];
  req.user.isAdmin = realm_access.roles.includes(USER_ROLES.ADMIN);

  if (!roles.length) return true;

  return roles.findIndex((role) => decodedToken.realm_access.roles.includes(role)) !== -1;
};

export default authChecker;
