// Requiriendo
const express = require("express");
const router = express.Router();

// Requiriendo controller
const usersController = require("../controllers/usersController");

const multer = require("multer");
const path = require("path");
const validationRegister = require('../middlewares/validRegister')

// Multer
const diskStorage = multer.diskStorage( {
    destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname,"../../public/uploads/avatars"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
});

const upload = multer({storage:diskStorage});

//Rutas de login y proceso de login
router.get("/login", usersController.login);
router.post("/access", usersController.processLogin); //Ruta que procesa el login del usuario.



// Rutas a Formulario de creacion de usuario
router.get("/register", usersController.register);
router.post("/save", [upload.single('avatar')],validationRegister, usersController.save);



module.exports = router;