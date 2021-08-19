let db = require("../database/models");

const productsController = {
    create: function (req, res) {
        const Categories = db.Category.findAll()
        const Colors = db.Color.findAll()
        Promise.all([Categories, Colors])
            .then(function ([categories, colors]) {
                return res.render("products/create", { categories: categories, colors: colors })
            })
    },

    save: function (req, res) {
        let colorsArray = req.body.color;
        db.Product.create({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category_id: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price
        }).then(function (productColor) {
            colorsArray.forEach(colors => {
                db.Product_color.create({
                    product_id: productColor.id,
                    color_id: colors
                });
            });
        })
        res.redirect("/")
    },

    index: (req, res) => {
        db.Product.findAll()
            .then((product) => {
                res.render("products/index", { product: product })
            })
        
    },

    show: function (req, res) {
        db.Product.findByPk(req.params.id, { include: [{ association: "colores" }, { association: "categoria" }] })
            .then((product) => {
                res.render("products/show", { product: product })
            })
    },

    edit: function (req, res) {
        const productSearch = db.Product.findByPk(req.params.id,
            { include: [{ association: "categoria" }, { association: "colores" }] })
        const category = db.Category.findAll()
        const colors = db.Color.findAll()
        const colorSelected = db.Product_color.findOne({
            where:
            {
                product_id: req.params.id
            },
            limit: 4
        });
        Promise.all([productSearch, category, colors, colorSelected])
            .then(function ([search, category, color, colorChoice]) {
                return res.render("products/edit", { search: search, category: category, color: color, colorChoice: colorChoice })
            })
    },

    update: function (req, res) {
        let colorsArray = req.body.color;
        let colorsArrayNumber = colorsArray.map(function(num) {
            num.parseInt});
        db.Product.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category_id: req.body.category,
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (productColor) {
            colorsArrayNumber.forEach(color => {
                db.Product_color.update({
                    color_id: color.id
                }, {
                    where:{ 
                        product_id: productColor.id }
                })
            });
        })
        res.redirect("/")
    },

    delete: function (req, res) {
        let colorsArray = req.body.color;
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (productColor) {
            colorsArray.forEach(colors => {
                db.Product_color.destroy({
                    where: {
                        product_id: productColor.id
                    }
                })
            });
        })
        res.redirect("/");
    }
}



module.exports = productsController;