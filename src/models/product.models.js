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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "product",
    freezeTableName: true,
    timestamps: true,
  }
);

Product.belongsTo(Category, {
  foreignKey: "category_id",
});

module.exports = Product;
