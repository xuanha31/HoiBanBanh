
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
console.log("Da Den Print 1");


// function module1() {
// app.get('/QuanLyKhach', function (req, res){
//
//     res.sendfile(__dirname+'QuanLyKhach');
//
//
// });

app.get('/PrintAccountSearch.js?', function (req, res){

    var user = req.param('user');
    // res.sendfile('./views/QuanLyKhach.html');
    // console.log(user);
console.log("Da Den Print 2");
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    //var search = req.params.username;
	// var query = { name :user };
  //console.log(query);
  db.collection("Human").find({name:user}).toArray(function(err, result) {
    //console.log(result.length);

  //  if(result.length>0){
    // console.log(result[0]._id);
    // console.log(result[0].name);
    // console.log(result[0].email);
    // console.log(result[0].phone);
    // app.get("/PrintAccountSearch.js", function(req,res){
    //res.sendFile(__dirname +"/QuanLyKhach.html");
    //res.send("<p>"+result[0].email+"</p>");
    res.render("QuanLyKhach", {result : result});
    db.close();

});
  });

});
// }
//
// module.exports  = module1;
