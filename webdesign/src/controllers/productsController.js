const productsController = {
    descriptionBike: (req, res) => {
        return res.render("products/product-descriptionBike");
    },
    descriptionAccessories: (req, res) => {
        return res.render("products/product-descriptionAccessories");
    },
    listBike: (req, res) => {
        return res.render("products/product-listBike");
    },
    listAccessories: (req, res) => {
        return res.render("products/product-listAccessories");   
    },
    createFormRender: (req, res) => {
        return res.render("products/create");
    },
    createFormData: (req, res) => {
        //Falta desarrollar para capturar la información con el req.body
    },
    editFormRender: (req, res) => {
        return res.render("products/edit");
    },
    editFormData: (req, res) => {
        //Falta desarrollar para capturar la información con el req.body
    }
};

module.exports = productsController;