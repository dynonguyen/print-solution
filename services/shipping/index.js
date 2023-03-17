// Set environment variables
require('dotenv').config();
require('module-alias/register');

// Import third-party
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

// Import local file
const { MAX } = require('~/constants/validation');
const getEnv = require('~/utils/getEnv');
const corsConfig = require('~/configs/cors');
const { BASE_URL } = require('~/constants/common');
const demoApi = require('~/controllers/demo');

// Config port
const app = express();
const SERVER_PORT = Number(getEnv('PORT') || 3001);

// Setup logger
const isDevMode = getEnv('NODE_ENV') !== 'production';

if (!isDevMode) {
  app.disable('x-powered-by');
  app.use(morgan('common'));
} else {
  app.use(morgan('dev'));
}

// Config express server
app.use(express.json({ limit: MAX.SIZE_JSON_REQUEST }));
app.use(express.urlencoded({ limit: MAX.SIZE_JSON_REQUEST, extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

// APIs
app.get(`${BASE_URL}/check-health`, (_, res) => res.status(200).json({ msg: 'OK' }));
app.use(`${BASE_URL}/demo`, demoApi); // EX: remove it

// Listening
app.listen(SERVER_PORT, () => {
  console.log(`SHIPPING SERVICE IS LISTENING ON PORT ${SERVER_PORT} !`);
});
