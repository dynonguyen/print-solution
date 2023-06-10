// UploadFile.js
const { DataTypes } = require('sequelize');
const { db } = require('~/configs/database');

const UploadFile = db.define('UploadFiles', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  base64: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  totalPage: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = UploadFile;
