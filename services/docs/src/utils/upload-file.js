const base64toFile = require('node-base64-to-file');
const logger = require('~/configs/logger');
const minioClient = require('~/configs/minio');
const { MINIO_BUCKET } = require('~/constants/common');
const fs = require('fs');

const tmpUploadDir = global.__root_dir + '/src/upload';

async function uploadFileBase64({ dataBase64, destPath }) {
  try {
    const tmpFileName = await base64toFile(dataBase64, { filePath: tmpUploadDir });
    const tmpFilePath = `${tmpUploadDir}/${tmpFileName}`;
    const fileInfo = await minioClient.fPutObject(MINIO_BUCKET, destPath, tmpFilePath);
    fs.rm(tmpFilePath, () => {});

    return fileInfo;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  uploadFileBase64
};
