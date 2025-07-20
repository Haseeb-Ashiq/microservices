const app = require("./app");
const http=require('http');

http.createServer(app).listen(3001,()=>console.log('user service running at 3000'));

