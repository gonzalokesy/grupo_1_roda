const userModel = require ('../models/userModel');

function aplicationUserMiddleware (req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = userModel.findByEmail(emailInCookie);

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
    }
    next();
}

module.exports = (aplicationUserMiddleware);