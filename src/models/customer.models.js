const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const User = require("./user.models");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    fullname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "customers",
    freezeTableName: true,
    timestamps: true,
  }
);

Customer.belongsTo(User, { foreignKey: "user_id" });

module.exports = Customer;
