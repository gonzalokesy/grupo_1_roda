let db = require ("../database/models");
const Color = require("../database/models/Color");

const productsController = {
    create: function (req,res) {
        const Categories =  db.Category.findAll()
        const Colors = db.Color.findAll()
        Promise.all([Categories, Colors])
            .then(function([categories, colors]){
                return res.render ("products/create", {categories:categories, colors:colors})
            })
    },

    save: function (req,res)  {
        let colorsArray = req.body.color;
        db.Product.create ({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category_id: req.body.category,
            color_id: req.body.color
        }).then (function (productColor) {
            colorsArray.forEach(colors => {
                db.Product_color.create({
                product_id: productColor.id,
                color_id: colors
                });
            });
        })
        res.redirect ("/")
    },

    indexProducts: (req, res) => {
        db.Product.findAll()
        .then((products) => {
            res.render("products/product-listBike", {bikes: products})
        })
    //RECORDAR UNIFICAR LAS VISTAS DE BICICLETAS Y ACCESORIOS A UNA SOLA (products-listBike y product-listAccessory)
    },

    showProduct: function(req, res){
        db.Product.findByPk(req.params.id,{include:[{association:"colores"},{association:"categoria"}]})
        .then((product) => {
            res.render("products/product-descriptionBike", {bikes: product})
        })
    },

    /*edit: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then((product) => 
        res.render("products/edit", {product: product}))
    },
    */
    edit: function(req,res){
        const productSelected =  db.Product.findByPk(req.params.id,
            {include:[{association:"colores"}]})
        const category = db.Category.findAll()
        const colors = db.Color.findAll()
        Promise.all([productSelected,category, colors])
            .then(function([productSelected,categories, colors]){
                return res.render ("products/edit", {productSelected:productSelected,categories:categories, colors:colors})
            })
    } 
    

}



module.exports = productsController;