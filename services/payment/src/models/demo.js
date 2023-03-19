// EXAMPLE: remove this file
const { db, DataTypes } = require('~/configs/database');

const DemoModel = db.define(
  'Demo',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(5),
      allowNull: false
    }
  },
  { tableName: 'Demo', timestamps: false }
);

module.exports = DemoModel;
