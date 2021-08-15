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
        db.Product.create ({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category_id: req.body.category,
            colores: req.body.color
        });//product_id
        res.redirect ("/")
    },

    edit: function (req,res) {
        
    }
    
}



module.exports = productsController;