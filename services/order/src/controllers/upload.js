const uploadApi = require('express').Router();
const { SUCCESS_CODE, ERROR_CODE } = require('~/constants/status-code');
const logger = require('~/configs/logger');
const { countPageEachFile } = require('~/utils/utils');

// -----------------------------
uploadApi.post('/files', async (req, res) => {
  const { listFiles = [], listFilesName = [] } = req.body;

  const listFileNameErr = [];

  for (const [idx, file] of listFiles.entries()) {
    const rs = await countPageEachFile(file, listFilesName[idx]);
    if (typeof rs === 'string') listFileNameErr.push(rs);
  }

  console.log('listFileNameErr: ', listFileNameErr);

  const err = false;
  if (err) {
    logger.error('Upload category photo failed: ', err);
    return res.status(ERROR_CODE.BAD_REQUEST).json({ msg: 'Upload thất bại' });
  }

  return res.status(SUCCESS_CODE.OK).json({ msg: 'Success' });
});

module.exports = uploadApi;
