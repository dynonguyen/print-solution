'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    id: DataTypes.UUID,
    userName: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    totalPrice: DataTypes.REAL,

  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};