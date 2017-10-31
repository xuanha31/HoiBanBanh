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
// su dung css
app.use(express.static(__dirname + '/views'));
server.listen(3000);

app.get('/PrintCake.js?', function (req, res){
    //get value from textbox search
    var cake = req.param('cake');

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;

	var query = { name : cake };
  db.collection("Cake").find(query).toArray(function(err, result) {
    res.render("QuanlyBanh", {result : result});
    db.close();
});
  });
});
