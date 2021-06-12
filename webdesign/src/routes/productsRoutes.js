const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/descriptionBike", productsController.descriptionBike);
router.get("/descriptionAccessories", productsController.descriptionAccessories);
router.get("/listBike", productsController.listBike);
router.get("/listAccessories", productsController.listAccessories);

module.exports = router;