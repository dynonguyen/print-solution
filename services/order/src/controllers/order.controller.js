const express = require("express");
const { order } = require("~/models");
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/create', async (req, res) => {
  const data = req.body;
  const newOrder = await order.create({ id: uuidv4(), userName: "tesst", phone: "tesst", address: "tesst", totalPrice: 10000 })
  return res.status(200).json(newOrder);
});


module.exports = router;