// Order.js
const { DataTypes } = require('sequelize');
const OrderProduct = require('./OrderProduct');
const { db } = require('~/configs/database');

function generateDisplayId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let displayId = '';

  for (let i = 0; i < 13; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    displayId += characters.charAt(randomIndex);
  }

  return displayId;
}

const Order = db.define('Orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  displayId: {
    type: DataTypes.STRING(13),
    allowNull: false,
    unique: true,
    defaultValue: generateDisplayId
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'WAITING_CONFIRM'
  },
  totalCost: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

OrderProduct.belongsTo(Order, { foreignKey: 'OrderId' });
Order.hasMany(OrderProduct, { as: 'products', foreignKey: 'OrderId' });

module.exports = Order;
