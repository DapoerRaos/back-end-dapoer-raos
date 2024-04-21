const { col } = require("sequelize");
const { customerModel, userModel } = require("../models");

async function getCustomerByTelephone(telephone) {
  return customerModel.findOne({
    where: {
      telephone: telephone,
    },
  });
}

async function getCustomers() {
  return customerModel.findAll({
    attributes: [
      "id",
      "user_id",
      [col("User.email"), "email"],
      "fullname",
      "telephone",
      "address",
    ],
    include: {
      model: userModel,
      required: true,
      attributes: [],
      as: "User",
    },
  });
}

async function getCustomerById(id) {
  return await customerModel.findOne({
    attributes: [
      "id",
      "user_id",
      [col("User.email"), "email"],
      [col("User.password"), "password"],
      "fullname",
      "telephone",
      "address",
    ],
    where: {
      user_id: id,
    },
    include: {
      model: userModel,
      required: true,
      attributes: [],
      as: "User",
    },
  });
}

async function updateCustomerById(id, data) {
  const { email, password, fullname, telephone, address } = data;

  await userModel.update(
    {
      email,
      password,
    },
    {
      where: {
        id: id,
      },
    }
  );

  await customerModel.update(
    {
      fullname,
      telephone,
      address,
    },
    {
      where: {
        user_id: id,
      },
    }
  );
}

module.exports = {
  getCustomerByTelephone,
  getCustomers,
  getCustomerById,
  updateCustomerById,
};