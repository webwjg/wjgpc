

const express=require('express');
const mysql=require('mysql');
var pool=mysql.createPool({
       host:'127.0.0.1',
	   post:3306,
	   user:'root',
	   password:'',
	   database:'universe_travel',
	   connectionLimit:20
});

module.exports=pool;










