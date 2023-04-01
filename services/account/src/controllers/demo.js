const { SUCCESS_CODE } = require('~/constants/status-code');

// EXAMPLE: Remove this file
const demoApi = require('express').Router();

demoApi.get('/list', (req, res) => {
  return res.status(SUCCESS_CODE.OK).json({ msg: 'OK', data: [1, 2, 3] });
});

demoApi.post('/create', (req, res) => {
  return res.status(SUCCESS_CODE.OK).json({ msg: 'OK' });
});

module.exports = demoApi;
