const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Category;
