const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function userAuth(req, res, next) {
    try {
        const token = res.cookies?.token || req.headers.authorization.split(' ')[1];
        if (!token) throw new Error('Token has been expired!');
        const decoded = jwt.verify(token, 'user_jwt_sign');
        if (!decoded) throw new Error('Unauthorized!');
        const user = await userModel.findById(decoded._id).exec();
        req._user = user;
        next();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
module.exports = userAuth;