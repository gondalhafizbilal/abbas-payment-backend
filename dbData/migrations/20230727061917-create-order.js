'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerName: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      cardHolderName: {
        type: Sequelize.STRING
      },
      cardNumber: {
        type: Sequelize.STRING
      },
      cardExpiry: {
        type: Sequelize.STRING
      },
      cvv: {
        type: Sequelize.STRING
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