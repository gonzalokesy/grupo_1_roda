const { body } = require('express-validator');
const userModel = require('../models/userModel')

module.exports = [
    //Validación email
    body("email").notEmpty().withMessage('Debe agregar un email').bail()
        .isEmail().custom(email => {
        let registered = userModel.findByEmail(email);
        if (registered) {
          return Promise.reject('Esta dirección de email ya existe');
        }
        return true
      }),
      //Validación contraseña y comparación
      body('password').notEmpty().withMessage('Debe agregar una contraseña').bail()
      .custom((password,{req }) => {
        if (password === req.body.passwordConfirm) {
          return true;
        } else {
          return false;
        }
      })
      .withMessage("Las contraseñas deben coincidir"),
      //Validación contraseña de confirmación
      body('passwordConfirm').notEmpty().withMessage('Debes confirmar la contraseña'),
      //Validación carga de avatar
      body('avatar').custom((value, { req }) => {
          let file = req.file;
          if(!file) {
              throw new Error('Debes cargar una imagen')
          }
          return true
      })
]