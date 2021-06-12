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
};

module.exports = productsController;