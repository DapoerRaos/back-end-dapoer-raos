const { SECRET_KEY } = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userRepositories, customerRepositories } = require("../repositories");

async function registerCustomer(data) {
  // address, city, postal_code
  const { email, password, fullname, telephone } = data;

  if (
    !email ||
    !password ||
    !fullname ||
    !telephone
    // !address ||
    // !city ||
    // !postal_code
  ) {
    throw new Error("All fields are required");
  }

  const checkEmail = await userRepositories.getUserByEmail(email);
  if (checkEmail) {
    throw new Error("Email already exists");
  }

  let parshedTelephone;
  if (telephone) {
    parshedTelephone = telephone.replace(/^\+62/, "0");
  }

  const checkTelephone = await customerRepositories.getCustomerByTelephone(
    parshedTelephone
  );
  if (checkTelephone) {
    throw new Error("Phone Number already used");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const response = await userRepositories.createCustomer({
    email,
    password: hashedPassword,
    fullname,
    telephone: parshedTelephone,
    // address,
    // city,
    // postal_code,
  });

  return response;
}

async function login({ email, password }) {
  const user = await userRepositories.getUserByEmail(email);

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

  const token = jwt.sign(authUser, SECRET_KEY, { expiresIn: "12h" });

  return token;
}

async function changePassword(email, password) {
  const user = await userRepositories.getUserByEmail(email);

  if (!user) {
    throw new Error("Email Tidak Terdaftar");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.dataValues.password
  );

  if (passwordMatch) {
    throw new Error("Password Sama");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const changePassword = await userRepositories.changePassword(
    email,
    hashedPassword
  );

  return changePassword;
}

module.exports = {
  login,
  registerCustomer,
  changePassword,
};
