const userModel = require ('../models/userModel');

function aplicationUserMiddleware (req, res, next) {
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = userModel.findByEmail(emailInCookie);

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }
    next();
}

module.exports = (aplicationUserMiddleware);