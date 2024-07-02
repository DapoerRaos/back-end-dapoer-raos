const { productModel } = require("../models");
const logger = require("../utils/logger");

const products = [];

const createProduct = (
  category_id,
  name,
  description,
  weight,
  price,
  stock,
  image_path
) => {
  const product = {
    category_id,
    name,
    description,
    weight,
    price,
    stock,
    image_path,
  };
  products.push(product);
};

createProduct(
  1,
  "Biji Ketapang Keju",
  "Kue Kering untuk cemilan keluarga. Berat 1/2 Kg",
  500,
  35000,
  10,
  "1711958618330-biji-ketapang-keju.jpg"
);
createProduct(
  1,
  "Biji Ketapang Keju Wijen",
  "Kue Kering untuk cemilan keluarga. Berat 1 Kg",
  1000,
  40000,
  8,
  "1711958819938-biji-ketapang-keju-wijen.jpg"
);
createProduct(
  2,
  "Kentang Goreng 808",
  "Kentang Goreng Crispy, 500 gram",
  500,
  42000,
  4,
  "1711959067198-kentang-goreng.jpeg"
);
createProduct(
  2,
  "Chicken Egg Roll",
  "Isi 10 pcs, Panjang 19 cm",
  700,
  20000,
  4,
  "1711959969148-chicken-egg-roll.jpeg"
);
createProduct(
  2,
  "Tahu Baso Original",
  "Isi 10 pcs, sudah termasuk sambal kecap",
  1200,
  35000,
  6,
  "1711960147338-tahu-baso.jpeg"
);
createProduct(
  2,
  "Nugget Kanzler Crispy",
  "Nugget Ayam Crispy 450 gram",
  450,
  43000,
  6,
  "1711960213012-nugget-kanzler.jpeg"
);
createProduct(
  2,
  "Chicken Katsu",
  "Chicken Katsu Frozen dijual per pcs",
  200,
  17000,
  5,
  "1711962082705-chicken-katsu.jpeg"
);
createProduct(
  2,
  "Daging Slice Original",
  "Daging Slice untuk steamboat atau bakaran, belum dibumbui. 400 gram",
  400,
  53000,
  5,
  "1712130095559-daging-slice.jpeg"
);
createProduct(
  2,
  "Bakso Ikan Pro",
  "Bakso Ikan serba guna, isi 20 pcs",
  800,
  22000,
  3,
  "1712130182820-bakso-ikan.jpeg"
);

const seedProducts = async () => {
  try {
    await productModel.bulkCreate(products);
    logger.info("Product seeded successfully");
  } catch (err) {
    logger.error("Error seeding product:", err);
  }
};

module.exports = seedProducts;
