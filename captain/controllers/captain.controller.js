const captainModel = require("../models/captain.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
async function Register(req, res) {
    try {
        const { name, email, phone, password } = req.body;
        const crypted_password = await bcrypt.hash(password, 10);
        const captain = await captainModel.create({
            name,
            email,
            phone,
            password: crypted_password,
            isAvailable: false
        });
        const token = await jwt.sign({ captainId: captain._id, captainName: captain.name }, "captain_server_jwt", { expiresIn: '1h' });
        res.cookie('captain_token', token, {
            httpOnly: true,
            maxAge: 60 * 60,
            secure: false
        });
        captain.token = token;
        await captain.save();
         delete captain.password;
        return res.status(201).json({ success: true, captain });
    } catch (error) {
        return res.status(error.message);
    }
}

async function Login(req, res) {
    try {
        const { email, password } = req.body;
        const isExist = await captainModel.findOne({ email }).exec();
        if (!isExist) throw new Error('invalid email or password');
        const cmpPassword = await bcrypt.compare(password, isExist.password);
        if (!cmpPassword) throw new Error('invalid password');
        const token = await jwt.sign({ captainId: isExist._id, captainName: isExist.name }, "captain_server_jwt", { expiresIn: '1h' });
        isExist.token=token;
         res.cookie('captain_token', token, {
            httpOnly: true,
            maxAge: 60 * 60,
            secure: false
        });
        await isExist.save();
        delete isExist.password;
        return res.status(200).json({ success: true, captain: isExist });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function Profile(req, res) {
    try {
        return res.status(200).json({ success: true, captain: req._captain });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { Register, Login ,Profile}