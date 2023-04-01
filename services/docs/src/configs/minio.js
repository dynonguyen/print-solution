const Minio = require('minio');
const getEnv = require('~/utils/getEnv');

const minioClient = new Minio.Client({
  endPoint: getEnv('MINIO_URI_ENDPOINT'),
  port: Number(getEnv('MINIO_PORT')),
  useSSL: false,
  accessKey: getEnv('MINIO_ACCESS_KEY'),
  secretKey: getEnv('MINIO_SECRET_KEY')
});

module.exports = minioClient;
