"use strict";
const { Model } = require("sequelize");
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
  Order.init(
    {
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cardHolderName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cardExpiry: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cardType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      response: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "order",
      modelName: "Order",
    }
  );
  return Order;
};
