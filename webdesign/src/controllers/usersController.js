const {check} = require('express-validator');
const userModel = require('../models/userModel');

const usersController = {
    login: (req, res) => {
        return res.render("users/login");
    },
    register: (req, res) => {
        return res.render("users/register");
    },
    save: (req,res) => {
        const errors = check(req);
          userModel.create(req.body,req.file);
          return res.redirect("/users/login");
        
    }
}

module.exports = usersController;