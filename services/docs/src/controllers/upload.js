const uploadApi = require('express').Router();
const { uploadFileBase64 } = require('~/utils/upload-file');
const { default: to } = require('await-to-js');
const { SUCCESS_CODE, ERROR_CODE } = require('~/constants/status-code');
const { getFileExt } = require('~/utils/helper');
const crypto = require('crypto');
const logger = require('~/configs/logger');
const minioClient = require('~/configs/minio');
const { MINIO_BUCKET } = require('~/constants/common');

// -----------------------------
uploadApi.post('/category-photo', async (req, res) => {
  const { dataBase64, fileName } = req.body;
  const fileExt = getFileExt(fileName);

  const photoUrl = `public/category/${crypto.randomBytes(20).toString('hex') + fileExt}`;

  const [err] = await to(uploadFileBase64({ dataBase64, destPath: photoUrl }));
  if (err) {
    logger.error('Upload category photo failed: ', err);
    return res.status(ERROR_CODE.BAD_REQUEST).json({ msg: 'Upload thất bại' });
  }

  return res.status(SUCCESS_CODE.OK).json({ photoUrl });
});

uploadApi.post('/product-photo', async (req, res) => {
  const { dataBase64, fileName } = req.body;
  const fileExt = getFileExt(fileName);

  const photoUrl = `public/product/${crypto.randomBytes(20).toString('hex') + fileExt}`;

  const [err] = await to(uploadFileBase64({ dataBase64, destPath: photoUrl }));
  if (err) {
    logger.error('Upload product photo failed: ', err);
    return res.status(ERROR_CODE.BAD_REQUEST).json({ msg: 'Upload thất bại' });
  }

  return res.status(SUCCESS_CODE.OK).json({ photoUrl });
});

uploadApi.delete('/photo', (req, res) => {
  const { photoUrl } = req.query;
  minioClient.removeObject(MINIO_BUCKET, photoUrl);
  return res.status(SUCCESS_CODE.OK).json({ msg: 'success' });
});

module.exports = uploadApi;
