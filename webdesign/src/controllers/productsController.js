// Requerimos modelos
const bikeModel = require('../models/bikeModel');
const accessoryModel = require('../models/accessoryModel');

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
        if (req.body.category == "bike") {
            let result = bikeModel.new(req.body, req.files);
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion");
        } else if (req.body.category == "accessory") {
            let result = accessoryModel.new(req.body, req.files);
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion");
        }
    },
    edit: (req, res) => {
        return res.render("products/edit", {bikes:bikeModel.one(req.params.id), accessories:accessoryModel.one(req.params.id)});
    },
    update: (req, res) => {
        if (req.body.category == "bike") {
            let result = bikeModel.edit(req.body, req.files, req.params.id);
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion");
        } else if (req.body.category == "accessory") {
            let result = accessoryModel.edit(req.body, req.files, req.params.id);
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion");
        }
    },
    delete: (req, res) => {
        //Falta desarrollar para capturar la información con el req.body
    }
};

module.exports = productsController;