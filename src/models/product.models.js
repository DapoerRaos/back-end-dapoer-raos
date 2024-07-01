const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Category = require("./category.models");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT(60),
    },
    weight: {
      type: DataTypes.DOUBLE(5, 2),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    stock: {
      type: DataTypes.INTEGER(3),
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    image_path: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
  },
  {
    tableName: "products",
    freezeTableName: true,
    timestamps: true,
  }
);

Product.belongsTo(Category, {
  foreignKey: "category_id",
});

module.exports = Product;
