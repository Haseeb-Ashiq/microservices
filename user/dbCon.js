const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb://localhost:27017/micro-user-service')
        .then(con => console.log('captain db connected'))
        .catch(error => console.log(error));
}
module.exports=connect;