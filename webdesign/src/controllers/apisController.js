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
        const products = await db.Product.findAll()
        return res.json(products)
    },

    showProducts: async (req, res) => {
       
    }, 

}

module.exports = apisController;