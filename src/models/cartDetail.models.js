const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Cart = require("./cart.models");
const Product = require("./product.models");

const CartDetail = sequelize.define(
  "CartDetail",
  {
    id: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      references: {
        model: Cart,
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
      defaultValue: 1,
    },
    total_price: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "cart_details",
    freezeTableName: true,
    timestamps: true,
  }
);

CartDetail.belongsTo(Cart, {
  foreignKey: "cart_id",
});

CartDetail.belongsTo(Product, {
  foreignKey: "product_id",
});

Cart.hasMany(CartDetail, {
  foreignKey: "cart_id",
  onDelete: "CASCADE",
});

module.exports = CartDetail;
