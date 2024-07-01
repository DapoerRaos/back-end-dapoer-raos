const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Order = require("./order.models");
const Product = require("./product.models");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.STRING(22),
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "order_items",
    freezeTableName: true,
    timestamps: true,
  }
);

OrderItem.belongsTo(Product, { foreignKey: "product_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });
Order.hasMany(OrderItem, { foreignKey: "order_id" });

module.exports = OrderItem;
