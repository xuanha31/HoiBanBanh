function module2() {
//1.require mongoose
const mongoose = require('mongoose')
//2.connect
const config = require('./config.json')
var url = config.connectionString;
var express = require("express");
var app = express();
var server = require("http").createServer(app);

app.set("view engine","ejs");
app.set("views","./views");
// su dung css
console.log("Da Den Update 1");

app.use(express.static(__dirname + '/views'));


app.get('/UpdateHuman.js?', function (req, res){

    var note = req.param('note');
    // // var lock = req.param('lock');
    console.log("Da Den Update 2");
    console.log(note);
    // console.log(lock);
  //  res.render("QuanLyBanh",{});

});
}
module.exports = module2;
