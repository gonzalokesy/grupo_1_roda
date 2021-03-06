let db = require("../database/models");
const { validationResult, cookie } = require('express-validator');
const bcrypt = require("bcryptjs");

const usersController = {

    login: (req, res) => {
        return res.render("users/login");
    },

    processLogin: async (req, res) => {
        try {
        const userToLogin = await db.User.findOne({
            where: {
                email: req.body.email
            }
        })
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
    }
        
    catch (error) {
        return res.send(error);
        }
    },

    register: (req, res) => {
        return res.render("users/register");
    },
    save: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('users/register', { errors: errors.mapped(), old: req.body });
        } else {
            try {
                db.User.create({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password,10),
                    image: req.file.filename
                })
            }
            catch (error) {
                return res.send(error)
            }
            res.redirect("/users/login");
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
    
}

module.exports = usersController;