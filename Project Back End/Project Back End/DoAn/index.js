router = require('./Controller_Admin/AddCategory');
var express = require("express");
var app = express();
app.set("view engine","ejs");
app.set("views","./views/Admin");

app.use(express.static(__dirname + '/views/Admin'));

app.get("/",function(req,res){
  res.render("Home",{})
});
