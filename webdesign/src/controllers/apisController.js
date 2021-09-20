const { sequelize } = require("../database/models");
let db = require("../database/models");
const Op = db.Sequelize.Op;


const apisController = {

    listUsers: async (req, res) => {
        const users = await db.User.findAll({
            attributes: {
                exclude: ["password", "image"]
            }
        })
        const viewUsers = users.map(function (uv){
            return {
                id: uv.id,
                email: uv.email,
                detail: "http://localhost:3030/apis/user/" + uv.id
            }
        })
        return res.json({
            data: viewUsers,
            quantity: viewUsers.length,
        })
    },

    showUsers: async (req, res) => {
        const users = await db.User.findByPk(req.params.id,{
            attributes: {
                exclude: ["password"]
            }
        })
        return res.json({
            data: users,
        })
    },

    listProducts: async (req, res) => {
        const products = await db.Product.findAll({
            include: ["colors", "category"],
            attributes: {
                exclude: ["price", "image", "quantity"]
            }
        })

        const productsDetail = products.map (function(pd) {
            return {
                id: pd.id,
                name: pd.name,
                description: pd.description,
                category: pd.category,
                colors: pd.colors,
                detail: "http://localhost:3030/apis/products/" + pd.id
            } 
        })

        const count = await db.Product.findAll({ group: "name" });
        return res.json(count)
    },

    showProducts: async (req, res) => {
        const products = await db.Product.findByPk(req.params.id,{
            include: ["colors", "category"]
        })
        return res.json({
            data: products,
        })
    }, 

}

module.exports = apisController;