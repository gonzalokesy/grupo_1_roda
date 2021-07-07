// Requerimos modelos
const bikeModel = require("../models/bikeModel");
const accessoryModel = require("../models/accessoryModel");

const productsController = {
    indexBikes: (req, res) => {
        return res.render("products/product-listBike", {bikes: bikeModel.allBikes()});
    },
    indexAccessories: (req, res) => {
        return res.render("products/product-listAccessories", {accessories: accessoryModel.allAccessories()});
    },
    showBike: (req, res) => {
        return res.render("products/product-descriptionBike", {bikes: bikeModel.one(req.params.id)});
    },
    showAccessory: (req, res) => {
        return res.render("products/product-descriptionAccessories", {accessories: accessoryModel.one(req.params.id)});
    },
    create: (req, res) => {
        return res.render("products/create");
    },
    save: (req, res) => {
        if (req.body.category == "bike") {
            let result = bikeModel.new(req.body, req.files);
            return result == true
                ? res.redirect("/")
                : res.send("Error al cargar la informacion");
        } else if (req.body.category == "accessory") {
            let result = accessoryModel.new(req.body, req.files);
            return result == true
                ? res.redirect("/")
                : res.send("Error al cargar la informacion");
        }
    },
    edit: (req, res) => {
        return res.render("products/edit", {
            product: bikeModel.one(req.params.id) ? bikeModel.one(req.params.id) : accessoryModel.one(req.params.id),
        });
    },
    update: (req, res) => {
        //return res.send({body:req.body, files:req.files, id:req.params.id})
        if (req.body.category == "bike") {
            let result = bikeModel.edit(req.body, req.files, req.params.id);
            return result == true
                ? res.redirect("/")
                : res.send("Error al cargar la informacion");
        } else if (req.body.category == "accessory") {
            let result = accessoryModel.edit(req.body, req.files, req.params.id);
            return result == true
                ? res.redirect("/")
                : res.send("Error al cargar la informacion");
        }
    },
    delete: (req, res) => {
        let eliminatedBike = bikeModel.delete(req.params.id);
        return eliminatedBike == true ? res.redirect ("/") : res.send ("Error al cargar la información")
    },
};

module.exports = productsController;
