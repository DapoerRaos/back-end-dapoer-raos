const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Customer = require("./customer.models");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
    total_price: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    va_number: {
      type: DataTypes.STRING,
    },
    bank: {
      type: DataTypes.STRING,
    },
    payment_date: {
      type: DataTypes.STRING,
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

module.exports = Order;
