const { DataTypes } = require('sequelize');
const { db } = require('~/configs/database');
const UploadFile = require('./UploadFile');

const OrderProduct = db.define('OrderProduct', {
  _id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalCost: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  details: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

OrderProduct.hasMany(UploadFile, { as: 'files' });
UploadFile.belongsTo(OrderProduct);

module.exports = OrderProduct;
