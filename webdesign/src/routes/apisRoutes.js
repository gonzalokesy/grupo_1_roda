const express = require("express");
const router = express.Router();
const apisController = require("../controllers/apisController");

router.get("/users", apisController.listUsers);
router.get("/user/:id", apisController.showUsers);
router.get("/products", apisController.listProducts);
router.get("/products/:id", apisController.showProducts);


module.exports = router;