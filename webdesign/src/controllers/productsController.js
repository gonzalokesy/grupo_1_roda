let db = require ("../database/models");

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
        const productSearch =  db.Product.findByPk(req.params.id,
            {include:[{association:"categoria"},{association:"colores"}]})
        const category = db.Category.findAll()
        const colors = db.Color.findAll()
        const colorSelected = db.Product_color.findOne({
            where: 
            {
                product_id: req.params.id
            },
            limit: 4
        });
        Promise.all([productSearch,category, colors, colorSelected])
            .then(function([search,category, color, colorChoice]){
                return res.render ("products/edit", {search:search,category:category, color:color, colorChoice:colorChoice})
            })
    }
     
    

}



module.exports = productsController;