const { customerRepositories, userRepositories } = require("../repositories");
const bcrypt = require("bcrypt");

async function getCustomers() {
  const customers = await customerRepositories.getCustomers();

  if (customers.length === 0) {
    throw new Error("Not Found");
  }

  return customers;
}

async function getCustomerById(id) {
  const customer = await customerRepositories.getCustomerById(id);

  if (!customer) {
    throw new Error("Not Found");
  }

  return customer;
}

async function updateCustomerById(id, data) {
  const { email, password, fullname, telephone, address } = data;

  const isCustomerExists = await customerRepositories.getCustomerById(id);
  if (!isCustomerExists) {
    throw new Error("Not Found");
  }

  if (email) {
    const existingUserWithEmail = await userRepositories.getUserByEmail(email);
    if (
      existingUserWithEmail &&
      existingUserWithEmail.id !== isCustomerExists.id
    ) {
      throw new Error("Email already exists");
    }
  }

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  await customerRepositories.updateCustomerById(id, {
    email: email || isCustomerExists.email,
    password: hashedPassword || isCustomerExists.password,
    fullname: fullname || isCustomerExists.fullname,
    telephone: telephone || isCustomerExists.telephone,
    address: address || isCustomerExists.address,
  });
}

module.exports = {
  getCustomers,
  getCustomerById,
  updateCustomerById,
};
