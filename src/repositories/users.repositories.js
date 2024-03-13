const { userModel, customerModel } = require("../models");

async function getUserByEmail(email) {
  return userModel.findOne({
    where: {
      email: email,
    },
  });
}

async function getUserById(id) {
  return userModel.findByPk(id);
}

async function createCustomer(data) {
  const { email, password, fullname, telephone, address } = data;

  const addUser = await userModel.create({
    email,
    password,
  });

  const userId = addUser.id;

  const addCustomer = await customerModel.create({
    user_id: userId,
    fullname,
    telephone,
    address,
  });

  return { addUser, addCustomer };
}

module.exports = {
  getUserByEmail,
  getUserById,
  createCustomer,
};
