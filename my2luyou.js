const express=require('express');

const pool=require('./my2pool.js');
var router=express.Router();

//1.登录


router.post('/my2reg',function(req,res){
    console.log(6);
    var $uname=req.body.uname;
    var $upwd=req.body.upwd;
    //var $uname=req.query.uname;
    //var $upwd=req.query.upwd;
    if(!$uname){
        res.send('请输入账号');
        return;
    }
    if(!$upwd){
        res.send('请输入密码');
        return;
    }
    var sql='select * from travel_user where uname=? and upwd=?';
    pool.query(sql,[$uname,$upwd],function(err,result){
        if(err) throw err;
            res.writeHead(200,{
                "Access-Control-Allow-Origin":"*"
            });
            res.write(JSON.stringify(result));
            res.end();



  });
});

////注册
router.post('/my2insert',function(req,res){
    var $uname=req.body.uname;
    var $upwd=req.body.upwd;
    var $email=req.body.email;
    var $phone=req.body.phone;
    var $user_name=req.body.user_name;
	// var $gender=req.query.gender;query

    console.log(6)
    //var $uname=req.query.uname;
    //var $upwd=req.query.upwd;
    //var $email=req.query.email;
    //var $phone=req.query.phone;
    //var $user_name=req.query.user_name;
console.log($uname);

if(!$uname){
    res.send('请输入账号');
    return;
}
if(!$upwd){
    res.send('请输入密码');
    return;
}
if(!$email){
    res.send('请输入邮箱');
    return;
}
if(!$phone){
    res.send('请输入手机号码');
    return;
}
if(!$user_name){
    res.send('请输入真实姓名');
    return;
}
var sql='insert into travel_user values(?,?,?,?,?,?,?,?)';
pool.query(sql,[null,$uname,$upwd,$email,$phone,null,$user_name,null],function(err,result){
    if(err) throw err;
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"*"
    });
    res.write(JSON.stringify(result));
    res.end();
});

});

//获取轮播数据
router.get('/indexlunbo',function(req,res){
    var sql='select * from travel_lunbo';
    pool.query(sql,function(err,result){
        if(err) throw err;
        res.writeHead(200,{
            "Access-Control-Allow-Origin":"*"
        });
        res.write(JSON.stringify(result));
        res.end();
    })
});

//获取首页一楼数据
router.get('/indexonefl',(req,res)=>{
    var sql=`select * from travel_indonefl_product`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Access-Control-Allow-Origin":"*"
        });
        res.write(JSON.stringify(result));
        res.end();
    })
})
//获取首页二楼数据
router.get('/indextwofl',(req,res)=>{
    var sql=`select * from travel_indtwofl_product`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Access-Control-Allow-Origin":"*"
        });
        res.write(JSON.stringify(result));
        res.end();
    })
})
//获取首页三楼数据
router.get('/indexthreefl',(req,res)=>{
    var sql=`select * from travel_indthreefl_product`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Access-Control-Allow-Origin":"*"
        });
        res.write(JSON.stringify(result));
        res.end();
    })
})
//获取首页四楼数据
router.get('/indexfourfl',(req,res)=>{
    var sql=`select * from travel_indfourfl_product`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Access-Control-Allow-Origin":"*"
        });
        res.write(JSON.stringify(result));
        res.end();
    })
})
//获取首页五楼数据
router.get('/indexfivefl',(req,res)=>{
    var sql=`select * from travel_indfivefl_product`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Access-Control-Allow-Origin":"*"
        });
        res.write(JSON.stringify(result));
        res.end();
    })
})

//获取全部商品数据
router.get('/',(req,res)=>{
    var bid=req.query.bid;
    // console.log(bid);
    var wid=req.query.wid;
    var qid=req.query.qid;
 var output={
        product:{},
        list1:{},
        list3:{},
        list4:{},
        list6:{}
    }
    var sql=`select * from travel_all_product where bid=?`;
    pool.query(sql,[bid],(err,result)=>{
        if(err) throw err;
        // console.log(result[0])
         output.product=result[0];
        //  console.log(output);
         var sql=`select * from travel_list4_product where qid=?`;
         pool.query(sql,[qid],(err,result)=>{
              output.list4=result[0];
                //  console.log(output);
                var sql=`select * from travel_list1_product where wid=?`;
                pool.query(sql,[wid],(err,result)=>{
                       output.list1=result[0];

                        res.writeHead(200,{
                         "Access-Control-Allow-Origin":"*"
                       });
                        res.write(JSON.stringify(output));
                        res.end(); 
                })
               
         })
    })
   

})


//获得预订数据 放入数据库 传递到下一个页面list6car
router.post('/yuding',(req,res)=>{
    //  console.log(req.body.ydnews);
     var ydnews=req.body.ydnews;
    var date=req.body.ydnews.date;
    var night=req.body.ydnews.night;
    var num=req.body.ydnews.num;
    var outdate=req.body.ydnews.outdate;
    // console.log(num);
    var sql=`insert into travel_yuding values(null,?,?,?,?)`;
    pool.query(sql,[date,night,num,outdate],(err,result)=>{
             if(err) throw err;
            //  console.log(result)
             if(result.affectedRows>0){
          
                 var yyid=result.insertId;
                
                //  console.log(yyid);
                 
                 res.writeHead(200,{
                     "Access-Control-Allow-Origin":"*"
                     });
                 res.write(JSON.stringify({msg:1,data:yyid}));
                 res.end();
            
             router.get('/yuxinxi',(req,res)=>{
                 var yid=req.query.yid;
                //  console.log(yid)
                 var sql=`select * from travel_yuding where yid=?`
                     pool.query(sql,[yid],(err,result)=>{
                      if(err) throw err;
                         
                    // console.log(yyid);
                             res.writeHead(200,{
                              "Access-Control-Allow-Origin":"*"
                              });
                             res.write(JSON.stringify({data:result[0]}));
                             res.end(); 
                     })
                 })
             }else{
                res.writeHead(200,{
                    "Access-Control-Allow-Origin":"*"
                  });
                   res.write(JSON.stringify({msg:0}));
                   res.end(); 
             }
            
    })
})

//从list6car获得最终预定数据,放入数据库
router.get('/insertyud',(req,res)=>{
    var tjres=req.query.tjres;
    console.log(tjres);

    var date=tjres.date;
    var night=tjres.night;
    var num=tjres.num;
    var outdate=tjres.outdate;
    var adult=tjres.crsum;  //成人数量
    var childsum=tjres.childsum;
    var sex=tjres.sex;
    var xings=tjres.xings;
    var sname=tjres.ydname;    
    var phone=tjres.ydphone;
    var email=tjres.ydemail;
    var weixin=tjres.wx;
    var other=tjres.other;
    // console.log(sex);

   var sql=`insert into travel_yd_success values(null,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
   pool.query(sql,[date,night,num,outdate,adult,childsum,sex,xings,sname,phone,email,weixin,other],(err,result)=>{
       if(err)throw err;
    //    console.log(result);
       res.writeHead(200,{
        "Access-Control-Allow-Origin":"*"
       });
            res.write(JSON.stringify(result));
            res.end();
       })
  
})


//从list3  获得私人定制,放入数据库
router.get('/insertdz',(req,res)=>{
    var personal=req.query.personal;
    console.log(personal);

    var dest=personal.dest;   
    var dzzt=personal.zhuti;
    var date=personal.godate;
    var gocity=personal.gocity;
    var night=personal.godaysum;
    var jibei=personal.jibei;
    var yusuan=personal.yusuan;
    var rom=personal.rom;
    var adult=personal.adultsum;  //成人数量
    var childsum=personal.childsum;
    var language=personal.language;
    var xuqiu=personal.need;
    var xings=personal.xs;
    var sname=personal.dzname;    
    var phone=personal.dzphone;
    var email=personal.dzemail;
    var weixin=personal.wx;
    var lxtime=personal.lxtime;
      console.log(dzzt);

   var sql=`insert into travel_dz values(null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
   pool.query(sql,[dest,dzzt,date,gocity,night,jibei,yusuan,rom,adult,,childsum,language,xuqiu,xings,sname,phone,email,weixin,lxtime],(err,result)=>{
       if(err)throw err;
        console.log(result);
       res.writeHead(200,{
        "Access-Control-Allow-Origin":"*"
       });
            res.write(JSON.stringify(result));
            res.end();
       })
  
})

//搜索功能
router.get('/search',(req,res)=>{
    //console.log(req.query.val);
    var title=req.query.val.title;
    //console.log(title);
    var sql=`select * from travel_all_product where title like '%${title}%'`
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        // console.log(result[0].bid);
       
        if(result.length>0){
             var bid=result[0].bid;
              res.writeHead(200,{
                "Access-Control-Allow-Origin":"*"
              });
               res.write(JSON.stringify({msg:1,bid:bid}));
               res.end(); 
        }else{
            res.writeHead(200,{
                "Access-Control-Allow-Origin":"*"
              });
               res.write(JSON.stringify({msg:0}));
               res.end(); 
        }

    })
})







































module.exports=router;