let db = require("../database/models/index");
const { validationResult } = require('express-validator');

const productsController = {

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

    create: function (req, res) {
        const Categories = db.Category.findAll()
        const Colors = db.Color.findAll()
        Promise.all([Categories, Colors])
            .then(function ([categories, colors]) {
                return res.render("products/create", { categories: categories, colors: colors })
            })
    },

    //Save que contiene los errores de validaciones
    save: async (req, res) => {
        try {
            const categories = await db.Category.findAll();
            const colors = await db.Color.findAll();
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                const product = await db.Product.create({
                    name: req.body.name,
                    description: req.body.description,
                    image: req.file.filename,
                    category_id: req.body.category,
                    quantity: req.body.quantity,
                    price: req.body.price
                })
                const addColor = await product.setColors(req.body.color);
            } else {
                res.render("products/create", { categories: categories, colors: colors, errors: errors.mapped(), old: req.body });
            }
        } catch (error) {
            return res.send(error);
        }
        res.redirect("/");
    },

    /*save: async (req, res) => {
        try { 
            const product = await db.Product.create ({
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
            category_id: req.body.category,
            quantity:req.body.quantity,
            price: req.body.price
            })
    
            const addColor = await product.setColors (req.body.color);
        }
        catch (error) {
            return res.send (error)
        }
        res.redirect("/")
    },*/

    edit: function (req, res) {
        const productSearch = db.Product.findByPk(req.params.id,
            { include: [{ association: "category" }, { association: "colors" }] })
        const category = db.Category.findAll()
        const colors = db.Color.findAll()
        Promise.all([productSearch, category, colors])
            .then(function ([search, category, colors]) {
                return res.render("products/edit", { search: search, category: category, totalColors: colors })
            })
    },

    //Update que contiene los errores de validaciones
    update: async (req, res) => {
        try {
            const search = await db.Product.findByPk(req.params.id,
                { include: [{ association: "category" }, { association: "colors" }] }) 
            const category = await db.Category.findAll()
            const colors = await db.Color.findAll()
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                const updated = await product.update({
                    name: req.body.name,
                    description: req.body.description,
                    image: req.file.filename,
                    category_id: req.body.category,
                    quantity: req.body.quantity,
                    price: req.body.price
                });
                const updateColor = await updated.setColors(req.body.color);
            } else {
                res.render("products/edit", { search: search, category: category, totalColors: colors, errors: errors.mapped(), old: req.body })
            }
        } catch (error) {
            return res.send("Existe un error");
        }
        res.redirect("/");
    },

    /*update: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            const updated = await product.update({
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                category_id: req.body.category,
                quantity: req.body.quantity,
                price: req.body.price
            });
            const updateColor = await updated.setColors(req.body.color);
        } catch (error) {
            return res.send("Existe un error");
        }
    },*/

    delete: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id)
            const deleteColors = await product.setColors([])
            const deleted = await product.destroy()
        } catch (error) {
            return res.send(error);
        }
        res.redirect("/")
    }
}



module.exports = productsController;