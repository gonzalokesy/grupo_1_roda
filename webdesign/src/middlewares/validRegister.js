const { body } = require('express-validator');
const userModel = require('../models/userModel')

module.exports = [
    //Validamos que el email no este en
    body("email").notEmpty().withMessage('Debe agregar un email').bail()
        .isEmail().custom(value => {
        let registered = userModel.findByEmail(value);
        if (registered) {
          return Promise.reject('Esta dirección de email ya existe');
        }
        return true
      }),
      body('password').notEmpty().withMessage('Debe agregar una contraseña').bail()

      //Tenemos que ver como validar para que sean iguales las
      .equals('passwordConfirm','password').withMessage('Deben coincidir las contraseñas'),
      body('passwordConfirm').notEmpty().withMessage('Debes confirmar la contraseña'),

      body('avatar').custom((value, { req }) => {
          let file = req.file;
          if(!file) {
              throw new Error('Tienes que subir una imagen')
          }
          return true
      })
]