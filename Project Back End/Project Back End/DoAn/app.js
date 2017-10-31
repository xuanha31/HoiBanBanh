
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
//SET VIEW ENGINE

app.use(express.static(__dirname + '/views'));


var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
});

app.use('/', function(req,res,next){
    next();
});
app.use('/PrintAccountSearch.js', require('./PrintAccountSearch.js'));
