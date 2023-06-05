'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      userName:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      address:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalPrice:{
        type: Sequelize.REAL,
        allowNull: false,
        default: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};