// Order.js
const { DataTypes } = require('sequelize');
const UploadFile = require('./UploadFile');
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
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
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
    allowNull: false
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdBy: {
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

Order.hasMany(UploadFile, { as: 'files' });
UploadFile.belongsTo(Order);

module.exports = Order;
