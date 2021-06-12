const mainController = {
    home: (req,res) => {
        return res.render("main/home");
    },
    aboutRoda: (req, res) => {
        return res.render("main/aboutRoda");
    },
};

module.exports = mainController;