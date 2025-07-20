const { default: mongoose } = require("mongoose");

const captainSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password:{type:String},
    isAvailable: { type: Boolean },
    token:{type:String}
})
module.exports = mongoose.model('Captain', captainSchema);