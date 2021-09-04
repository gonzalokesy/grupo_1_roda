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

    //Validación de selección de color
    body('category').notEmpty().withMessage('Debes seleccionar al menos una categoría'),

    //Validación de cantidad
    body('quantity').notEmpty().isInt().isFloat({ min: 1 })
        .withMessage('Debes agregar la cantidad de productos'),

    //Validación de precio
    body('price').notEmpty().isFloat({ min: 1 })
        .withMessage('Debes agregar el precio')
]