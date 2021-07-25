const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');

const usersController = {
    login: (req, res) => {
        return res.render("users/login");
    },
    processLogin: (req, res) => {
        let userToLogin = userModel.findByEmail (req.body.email); // Utiliza el método del modelo. En caso de que exista, continua al IF de valdiacion de contraseña. 
        if (userToLogin) {
            return res.send (userToLogin)
        }else{
            res.render("users/login", {
                errors: {
                    email: {
                        msg: "Credenciales inválidas"
                    }
                }
            })
        }
       return res.send (userToLogin);
    },
    register: (req, res) => {
        return res.render("users/register");
    },
    save: (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('users/register', { errors: errors.mapped(), old: req.body });
        } else {
            userModel.create(req.body,req.file);
            return res.redirect("/users/login");
        }
    }
}

module.exports = usersController;