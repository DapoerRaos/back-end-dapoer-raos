const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
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
