const mongoose = require('mongoose')
const cakeTypeModel = require('../Schema/CakeTypeSchema');


//2.connect
const config = require('../config.json')
var url = config.connectionString;
var express = require("express");
var app = express();
var router = express.Router();
var server = require("http").createServer(app);
var multer = require('multer')
var bodyParser = require('body-parser')
//cau hinh ejs
app.set("view engine","ejs");
app.set("views","./views/Admin");

app.use(express.static(__dirname + '/views/Admin'));
server.listen(3000);
mongoose.connect(config.connectionString,(err)=>{
  if(err){
    console.log(err);
  }else {
    console.log('connect db success');;
  }
})


app.get('/Category',function(req,res){
    res.render("ThemDanhMuc",{});
});
app.get('/InsertCategory',function(req,res){
  var name_category = req.param('category');
  cakeTypeModel.create({
    cake_type : name_category
  });
    res.render("ThemDanhMuc",{});
});
