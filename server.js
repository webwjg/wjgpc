const express=require('express');
 //引入用户路由器
const my2=require('./my2luyou.js');


const bodyParser=require('body-parser');

var server=express();
server.listen(5050);
server.use(express.static('./my2html'));
// server.use(express.static('../my2js'));
server.use(express.static('/index'));


//配置中间件,使用内置的qs
server.use(bodyParser.urlencoded({
    extened:false
}));


//使用路由器管理路由
//server.get('/regg',function(req,res){
//     console.log(1);
//});

server.use('/my2',my2);
