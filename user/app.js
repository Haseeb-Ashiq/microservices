const cookieParser = require('cookie-parser');
const express = require('express');
const router = require('./router');
const connect = require('./dbCon');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/', router);
(() => {
    connect();
})()
module.exports = app;