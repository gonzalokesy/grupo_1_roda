let db = require("../database/models/index");

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

    save: async (req, res) => {
        try { 
            console.log (req.files)
            const product = await db.Product.create ({
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category,
            quantity:req.body.quantity,
            price: req.body.price
            })
    
            const addColor = await product.setColors (req.body.color);
            //res.redirect("products/index");
        }
        catch (error) {
            return res.send (error)
        }
        
    },

    edit: function (req, res) {
        const productSearch = db.Product.findByPk(req.params.id,
            { include: [{ association: "category" }, { association: "colors" }] })
        const category = db.Category.findAll()
        const colors = db.Color.findAll()
        Promise.all([productSearch, category, colors])
            .then(function ([search, category, colors]) {
                return res.render("products/edit" ,{ search: search, category: category, colors: colors })
            })
    },

    update: async (req, res) => {
        try {
            const updated = await db.Product.update({
                name: req.body.name,
                description: req.body.description,
                //image: req.file.filename.image, 
                category_id: req.body.category,
                quantity: req.body.quantity,
                price: req.body.price
            }, {
                where: {
                    id: req.params.id
                }
            })
            const updateColor = await db.Product.setColors(req.body.color, {
                where: {
                    product_id: req.params.id
                }
            })
        } catch (error) {
            return res.send(error);
        }
    },

    delete: async function (req, res) {
        try {
            const deleteProduct = await db.Product.destroy({
                where: {
                    id: req.params.id
                }});
            const deleteColors = await db.Product.setColor()
        } catch (error) {
            return res.send(error);
        }
        res.redirect("/")
    }
}



module.exports = productsController;