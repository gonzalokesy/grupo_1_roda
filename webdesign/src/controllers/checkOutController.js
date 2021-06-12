const checkOutController = {
    cart: (req, res) => {
        return res.render("checkOut/cart");
    },
    cartShipping: (req, res) => {
        return res.render("checkOut/cartShipping");
    },
};

module.exports = checkOutController;