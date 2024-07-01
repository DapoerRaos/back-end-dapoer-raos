const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Customer = require("./customer.models");
const Shipping = require("./shipping.models");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.STRING(22),
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
    shipping_id: {
      type: DataTypes.STRING(16),
      allowNull: false,
      references: {
        model: Shipping,
        key: "id",
      },
    },
    total_price: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    va_number: {
      type: DataTypes.STRING(20),
    },
    bank: {
      type: DataTypes.STRING(10),
    },
    payment_date: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    freezeTableName: true,
    timestamps: true,
  }
);

Order.belongsTo(Customer, { foreignKey: "customer_id" });
Order.belongsTo(Shipping, { foreignKey: "shipping_id" });

module.exports = Order;
