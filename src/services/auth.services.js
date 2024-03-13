const { SECRET_KEY } = require("../config");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { usersRepositories, customersRepositories } = require("../repositories");

async function login({ email, password }) {
  const user = await usersRepositories.getUserByEmail(email);

  if (!user) {
    throw new Error("Unauthorized");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.dataValues.password
  );
  if (!passwordMatch) {
    throw new Error("Unauthorized");
  }

  const authUser = {
    id: user.dataValues.id,
    role: user.dataValues.role,
  };

  const token = sign(authUser, SECRET_KEY, { expiresIn: "5h" });

  return token;
}

async function registerCustomer(data) {
  const { email, password, fullname, telephone, address } = data;

  if (!email || !password || !fullname || !telephone || !address) {
    throw new Error("All fields are required");
  }

  const checkEmail = await usersRepositories.getUserByEmail(email);
  if (checkEmail) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const response = await usersRepositories.createCustomer({
    email,
    password: hashedPassword,
    fullname,
    telephone,
    address,
  });

  return response;
}

module.exports = {
  login,
  registerCustomer,
};
