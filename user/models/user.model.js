const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    isActive: { type: String },
    token: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);