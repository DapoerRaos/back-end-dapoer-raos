const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Category = require("./category.models");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    weight: {
      type: DataTypes.DOUBLE(6, 2),
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
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    image_path: {
      type: DataTypes.STRING,
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
