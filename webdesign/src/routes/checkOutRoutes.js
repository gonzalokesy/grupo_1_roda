const express = require("express");
const router = express.Router();
const checkOutController = require("../controllers/checkOutController");

router.get("/cart", checkOutController.cart);
router.get("/cartShipping", checkOutController.cartShipping);

module.exports = router;