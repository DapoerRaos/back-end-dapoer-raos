const { Router } = require("express");
const { rajaOngkirControllers } = require("../controllers");

const router = Router();

router.route("/province").get(rajaOngkirControllers.getProvinces);

router.route("/city").get(rajaOngkirControllers.getCities);

router.route("/cost").post(rajaOngkirControllers.postCost);

module.exports = router;
