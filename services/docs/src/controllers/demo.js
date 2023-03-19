// EXAMPLE: Remove this file
const demoApi = require('express').Router();

demoApi.get('/list', (req, res) => {
  return res.status(200).json({ msg: 'OK', data: [1, 2, 3] });
});

demoApi.post('/create', (req, res) => {
  return res.status(200).json({ msg: 'OK' });
});

module.exports = demoApi;
