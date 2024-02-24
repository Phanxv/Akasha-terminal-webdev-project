const jwt = require('jsonwebtoken')

exports.jwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    try {
        const user = jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    }
    catch (err){
        res.clearCookie("token");
        res.clearCookie("userId");
        return res.redirect("/login");
    }
}