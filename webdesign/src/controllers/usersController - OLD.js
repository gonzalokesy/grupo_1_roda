const {validationResult, cookie} = require('express-validator');
const userModel = require('../models/userModel');
const bcrypt = require("bcryptjs");

const usersController = {
    login: (req, res) => {
        return res.render("users/login");
    },
    processLogin: (req, res) => {
        let userToLogin = userModel.findByEmail (req.body.email);
        if (userToLogin) {
            let verifypassword = bcrypt.compareSync (req.body.password, userToLogin.password);
            if (verifypassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                    if (req.body.rememberUser) {
                    res.cookie ('userEmail', req.body.email, {maxAge: (10000000 * 60)}) //seteando la cookie que se utilziará para mantener el session. 
                    }
                return res.redirect ('/users/profile');
            }
            res.render("users/login", {
                errors: {
                    email: {
                        msg: "Usuario o contraseña incorrectos"
                    }
                }
            })
        }else{
            res.render("users/login", {
                errors: {
                    email: {
                        msg: "Usuario o contraseña incorrectos"
                    }
                }
            })
        }
    },
    profile: (req,res) => {
        return res.render("users/profile", {
        user : req.session.userLogged
        });
    },
    logout : (req, res) => {
        res.clearCookie ('userEmail');
        req.session.destroy();
        return res.redirect('/');
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