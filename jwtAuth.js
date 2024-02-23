const jwt = require('jsonwebtoken')

exports.jwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    }
    catch (err){
        res.clearCookie("token");
        return res.redirect("/login");
    }
}