const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
async function userAuth(req, res, next) {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        console.log(token)
        if (!token) throw new Error('token expired');
        const decoded = await jwt.verify(token, "captain_server_jwt");
        const captain = await captainModel.findById(decoded.captainId);
        if (!captain) throw new Error('Captain not found!');
        req._captain = captain;
        next();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
module.exports=userAuth;