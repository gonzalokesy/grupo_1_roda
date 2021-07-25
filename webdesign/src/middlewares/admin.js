const admin = function (req, res, next) {
    req.body.admin =  req.body.email.indexOf("@roda.com.ar") != -1 ? true : false;
    next();
}

module.exports = admin; 

