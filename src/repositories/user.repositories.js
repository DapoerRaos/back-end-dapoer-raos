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
  // address, city, postal_code
  const { email, password, fullname, telephone } = data;

  const addUser = await userModel.create({
    email,
    password,
  });

  const userId = addUser.id;

  const addCustomer = await customerModel.create({
    user_id: userId,
    fullname,
    telephone,
    // address,
    // city,
    // postal_code,
  });

  return { addUser, addCustomer };
}

async function changePassword(email, hashedPassword) {
  return await userModel.update(
    {
      password: hashedPassword,
    },
    {
      where: {
        email: email,
      },
    }
  );
}

module.exports = {
  getUserByEmail,
  getUserById,
  createCustomer,
  changePassword,
};
