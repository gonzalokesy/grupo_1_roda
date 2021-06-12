const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/ingresar", usersController.login);
router.get("/registrarse", usersController.register);

module.exports = router;