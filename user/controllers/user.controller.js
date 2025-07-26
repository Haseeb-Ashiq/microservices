const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
async function Register(req, res) {
    try {
        const { name, email, password } = req.body;
        const isExist = await userModel.findOne({ email }).exec();
        if (isExist) throw new Error('User already register!');
        const cryptedPass = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,
            password: cryptedPass,
            isActive: false
        })
        const token = jwt.sign({ _id: user._id, name: user.name }, "user_jwt_sign", { expiresIn: '1h' });
        user.token = token;
        await user.save();
        res.cookie('user_token', token, {
            httpOnly: true,
            maxAge: 60 * 60,
            secure: false
        })
        return res.status(201).json({ success: true, user });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function Login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).exec();
        if (!user) throw new Error('User not register!');
        const isPassTrue = await bcrypt.compare(password, user.password);
        if (!isPassTrue) throw new Error('Password invalid!');
        const token = jwt.sign({ _id: user._id, name: user.name }, "user_jwt_sign", { expiresIn: '1h' });
        res.cookie('user_token', token, {
            httpOnly: true,
            maxAge: 60 * 60,
            secure: false
        });
        user.token = token;
        await user.save();
        delete user.password;
        return res.status(200).json({ success: true, user })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function Profile(req, res) {
    try {
        return res.status(200).json({ success: true, user: req._user })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
module.exports = { Register, Login, Profile }