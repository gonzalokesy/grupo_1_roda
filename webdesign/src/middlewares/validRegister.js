const { body } = require('express-validator');
const db = require("../database/models/index");

module.exports = [
  //Validación email
  body("email").notEmpty().withMessage('Debe agregar un email').bail()
    .isEmail().custom(value => {
      return db.User.findOne({
        where: {
          email: value
        }
      }).then(user => {
        if (user) {
          return Promise.reject('Este email ya fue registrado');
        }
      });
    }),

  //Validación contraseña y comparación
  body('password').notEmpty().withMessage('Debe agregar una contraseña').bail()
    .custom((password, { req }) => {
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
    if (!file) {
      throw new Error('Debe cargar una imagen')
    }
    return true
  })
]