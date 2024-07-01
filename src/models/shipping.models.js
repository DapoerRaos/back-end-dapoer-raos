const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const Shipping = sequelize.define(
  "Shipping",
  {
    id: {
      type: DataTypes.STRING(16),
      primaryKey: true,
    },
    courier: {
      type: DataTypes.STRING(6),
    },
    service: {
      type: DataTypes.STRING(25),
    },
    status: {
      type: DataTypes.STRING(25),
    },
    type: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    cost: {
      type: DataTypes.DOUBLE(10, 2),
    },
    province: {
      type: DataTypes.STRING(35),
    },
    city: {
      type: DataTypes.STRING(25),
    },
    address: {
      type: DataTypes.STRING(100),
    },
    etd: {
      type: DataTypes.STRING(8),
    },
  },
  {
    tableName: "shippings",
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Shipping;
