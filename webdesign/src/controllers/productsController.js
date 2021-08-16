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

    edit: function (req,res) {
        
    }
    
}



module.exports = productsController;