//1.require mongoose
const mongoose = require('mongoose')
//2.connect
const config = require('./config.json')
var url = config.connectionString;
var express = require("express");
var app = express();
var server = require("http").createServer(app);
//cau hinh ejs
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static(__dirname + '/views'));
app.get('/', function (req, res){
  res.render("Home",{});
})
