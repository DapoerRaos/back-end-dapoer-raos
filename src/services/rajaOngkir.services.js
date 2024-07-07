const axios = require("axios");
const { RAJAONGKIR_API_KEY } = require("../config");

async function getProvinces() {
  const response = await axios.get(
    "https://api.rajaongkir.com/starter/province",
    {
      headers: {
        key: RAJAONGKIR_API_KEY,
      },
    }
  );
  return response.data.rajaongkir.results;
}

async function getCities(province) {
  const response = await axios.get(
    `https://api.rajaongkir.com/starter/city?province=${province}`,
    {
      headers: {
        key: RAJAONGKIR_API_KEY,
      },
    }
  );
  return response.data.rajaongkir.results;
}

async function postCost({ origin, destination, weight, courier }) {
  try {
    const response = await axios.post(
      "https://api.rajaongkir.com/starter/cost",
      {
        origin,
        destination,
        weight,
        courier,
      },
      {
        headers: {
          key: RAJAONGKIR_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const { results, destination_details } = response.data.rajaongkir;
    return {
      destination_details,
      results,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getProvinces,
  getCities,
  postCost,
};
