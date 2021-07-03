// Requerimos modelos
const bikeModel = require('../models/bikeModel');

const productsController = {
    indexBikes: (req, res) => {
        return res.render("products/product-listBike");
    },
    indexAccessories: (req, res) => {
        return res.render("products/product-listAccessories");   
    },
    showBike: (req, res) => {
        return res.render("products/product-descriptionBike");
    },
    showAccessory: (req, res) => {
        return res.render("products/product-descriptionAccessories");
    },
    create: (req, res) => {
        return res.render("products/create");
    },
    save: (req, res) => {
        return res.send({data:req.body, files: req.files})
        //let result = bikeModel.new(req.body, req.files);
        //return result == true ? res.redirect("/") : res.send("Error al cargar la informacion");
    },
    edit: (req, res) => {
        return res.render("products/edit");
    },
    update: (req, res) => {
        //Falta desarrollar para capturar la información con el req.body
    },
    delete: (req, res) => {
        //Falta desarrollar para capturar la información con el req.body
    }
};

module.exports = productsController;