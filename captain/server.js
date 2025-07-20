const app = require("./app");
const http=require('http');

http.createServer(app).listen(3002,()=>console.log('captain service running at 3002'));