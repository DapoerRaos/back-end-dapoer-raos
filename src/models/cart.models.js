const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Customer = require("./customer.models");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
  },
  {
    tableName: "carts",
    freezeTableName: true,
    timestamps: true,
  }
);

Cart.belongsTo(Customer, {
  foreignKey: "customer_id",
});

module.exports = Cart;
