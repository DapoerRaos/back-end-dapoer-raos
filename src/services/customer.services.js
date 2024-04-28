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

async function getCustomerDetailById(id) {
  const customer = await customerRepositories.getCustomerDetailById(id);

  if (!customer) {
    throw new Error("Not Found");
  }

  return customer;
}

async function updateCustomerById(id, data) {
  const { email, password, fullname, telephone, address, city, postal_code } =
    data;

  const user = await customerRepositories.getCustomerById(id);

  if (!user) {
    throw new Error("Not Found");
  }

  let existEmail;
  if (email && email !== "") {
    existEmail = await userRepositories.getUserByEmail(email);
  }

  if (existEmail && user.email != existEmail.email) {
    throw new Error("Email already exists");
  }

  let hashPassword;
  if (password && password !== "") {
    hashPassword = await bcrypt.hash(password, 10);
  }

  let parshedTelephone;
  if (telephone && telephone !== "") {
    parshedTelephone = telephone.replace(/^\+62/, "0");
    const checkTelephone = await customerRepositories.getCustomerByTelephone(
      parshedTelephone
    );
    if (checkTelephone) {
      throw new Error("Phone Number already used");
    }
  }

  await customerRepositories.updateCustomerById(id, {
    email: email === "" ? user.email : email,
    password: hashPassword,
    fullname: fullname === "" ? user.fullname : fullname,
    telephone: parshedTelephone || user.telephone,
    address: address === "" ? user.address : address,
    city: city === "" ? user.city : city,
    postal_code: postal_code === "" ? user.postal_code : postal_code,
  });
}

module.exports = {
  getCustomers,
  getCustomerById,
  getCustomerDetailById,
  updateCustomerById,
};
