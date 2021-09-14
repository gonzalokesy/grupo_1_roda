const db = require ('../database/models/index');

 module.exports = async (req, res, next) => {
    res.locals.isLogged = false;
    let emailInCookie = req.cookies.userEmail;
    if (emailInCookie != undefined){
        let userFromCookie = await db.User.findOne({
            where: {
                email: emailInCookie
            }
        })
        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }
    }
    if (req.session.userLogged) {
        res.locals.isLogged = true;
    }
   
    next();
}

