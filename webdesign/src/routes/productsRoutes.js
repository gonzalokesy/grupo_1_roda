// Requiriendo 
const express = require("express");
const router = express.Router();

// Requiriendo controller
const productsController = require("../controllers/productsController");

// Requiriendo middlewares
const adminAccess = require("../middlewares/adminAccess")

// Multer
const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage( {
    destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname,"../../public/uploads/products"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
});

const upload = multer({storage:diskStorage});

// Rutas a lista general de productos
router.get("/indexBikes", productsController.indexProducts);
//router.get("/indexAccessories", productsController.indexAccessories); ESTO NO VA

// Rutas a descripción de cada producto
router.get("/showBike/:id", productsController.showProduct);
//router.get("/showAccessory/:id", productsController.showAccessory);

// Rutas a Formulario de creación 
router.get("/create", productsController.create);
router.post("/save", [upload.any()], productsController.save);

// Rutas a Formulario de edición 
router.get("/edit/:id", /*adminAccess,*/ productsController.edit);
router.put("/update/:id", [upload.any()], productsController.update);

// Ruta a Formulario de eliminación 
router.delete("/delete/:id", productsController.delete);

module.exports = router;