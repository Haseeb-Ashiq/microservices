const express=require('express');
const connect = require('./dbCon');
const router = require('./router');
const cookieParser = require('cookie-parser');
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use('/',router);
(()=>{
    connect();
})()

module.exports=app;