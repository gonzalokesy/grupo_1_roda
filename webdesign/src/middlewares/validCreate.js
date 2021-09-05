const { body } = require('express-validator');
const db = require("../database/models/index");

module.exports = [
    //Validación producto único
    body("name").notEmpty().withMessage('Debe agregar un producto').bail()
        .custom(value => {
            return db.Product.findOne({
                where: {
                    name: value
                }
            }).then(product => {
                if (product) {
                    return Promise.reject('Este producto ya fue registrado');
                }
            });
        }),

    //Validación descripción
    body('description').notEmpty().withMessage('Debe agregar una descripción'),

    //Validación carga de imagen de producto
    body('image').custom((value, { req }) => {
        let file = req.file;
        if (!file) {
            throw new Error('Debe cargar una imagen')
        }
        return true
    }),

    //Validación de selección de color
    body('color').notEmpty().withMessage('Debes seleccionar al menos un color'),

    //Validación de cantidad
    body('quantity').notEmpty().withMessage('Debes agregar la cantidad de productos').bail()
    .isInt().isFloat({ min: 1 })
        .withMessage('Sólo numeros enteros mayores a cero'),

    //Validación de precio
    body('price').notEmpty().withMessage('Debes agregar el precio').bail()
    .isFloat({ min: 1 })
        .withMessage('Sólo números mayores a cero')
]