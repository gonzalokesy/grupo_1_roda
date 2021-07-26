const adminAccess = function (req, res, next) {
    req.body.admin =  req.session.userLogged.email.indexOf("@roda.com.ar") != -1 ? true : false;
    if (req.body.admin) {
        next()
    } else {
        res.redirect("/");
    }
}

module.exports = adminAccess;