const { customerModel } = require("../models");
const logger = require("../utils/logger");

const customers = [];

const createCustomers = (
  user_id,
  fullname,
  telephone,
  address,
  city,
  postal_code
) => {
  const customer = {
    user_id,
    fullname,
    telephone,
    address,
    city,
    postal_code,
  };
  customers.push(customer);
};

createCustomers(
  2,
  "Aswangga Bhanu Rizqullah",
  "081320909411",
  "Griya Pamulang 2 Blok C3/10 RT02,RW20 Pondok Benda",
  "Tangerang Selatan",
  "15416"
);
createCustomers(
  3,
  "Leandra Chika Gayatri",
  "085973987950",
  "Pamulang Permai Raya Blok A2/50 RT07,RW09 Pamulang Timur",
  "Tangerang Selatan",
  "15417"
);
createCustomers(
  4,
  "Raul Aksal",
  "085697963945",
  "Jalan Cendrawasih No.8 RT.1/RW.1 Sawah Lama, Ciputat",
  "Tangerang Selatan",
  "15415"
);

const seedCustomers = async () => {
  try {
    await customerModel.bulkCreate(customers);
    logger.info("Customer seeded successfully");
  } catch (error) {
    logger.error("Error seeding customer:", error);
  }
};

module.exports = seedCustomers;
