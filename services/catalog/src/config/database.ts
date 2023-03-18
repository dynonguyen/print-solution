import { connect, ConnectOptions } from 'mongoose';
import getEnv from '~/utils/getEnv';
import logger from './logger';

const mongooseConnect = async () => {
  try {
    const mongoURI: string = getEnv('MONGODB_URI') || '';
    logger.info(`MongoDB at ${mongoURI} Connecting...`);

    const options: ConnectOptions = { connectTimeoutMS: 30000 };
    await connect(mongoURI, options);

    logger.info('MongoDB Connected');
    return true;
  } catch (err) {
    throw err;
  }
};

export default mongooseConnect;
