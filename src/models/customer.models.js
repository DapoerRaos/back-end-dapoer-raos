const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const User = require("./user.models");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    fullname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "customer",
    freezeTableName: true,
    timestamps: true,
  }
);

Customer.belongsTo(User, { foreignKey: "user_id" });

module.exports = Customer;
