module.exports.isLoggedIn = (req, res, next)=>{
    // console.log(req.user);
    // console.log(req)
    if(!req.isAuthenticated()){
        // if user is not logged in - we will store url requested by user before loggin in
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    }

    next();
};

module.exports.savedRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next();
};