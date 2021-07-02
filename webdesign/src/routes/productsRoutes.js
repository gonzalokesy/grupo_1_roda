const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// Rutas a lista general de productos
router.get("/indexBikes", productsController.indexBikes);
router.get("/indexAccessories", productsController.indexAccessories);

// Rutas a descripción de cada producto
router.get("/showBike", productsController.showBike);
router.get("/showAccessory", productsController.showAccessory);

// Rutas a Formulario de creación 
router.get("/create", productsController.create);
router.post("/save", productsController.save);

// Rutas a Formulario de edición 
router.get("/edit/:id", productsController.edit);
router.put("/update/:id", productsController.update);

// Ruta a Formulario de eliminación 
router.delete("/delete/:id", productsController.delete);

module.exports = router;