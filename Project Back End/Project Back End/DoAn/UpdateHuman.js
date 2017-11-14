
//1.require mongoose
const mongoose = require('mongoose')
const cakeModel = require('./Schema/CakeSchema');
const EventModel = require('./Schema/EventSchema');
const BlogModel = require('./Schema/BlogSchema');
const humanModel = require('./Schema/HumanSchema');
//2.connect
const config = require('./config.json')
var url = config.connectionString;
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var multer = require('multer')
var bodyParser = require('body-parser')
//cau hinh ejs
app.set("view engine","ejs");
app.set("views","./views/Admin");

app.use(express.static(__dirname + '/views/Admin'));
server.listen(3000);
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/InsertCake', function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
  db.collection("Cake").find().toArray(function(err, resultCakeCategory) {
    res.render("Themmaubanh", {resultCakeCategory : resultCakeCategory});
    db.close();
    })
  })
})
var storage = multer.diskStorage({
  destination : function(req,file,cb){cb(null,'./Upload')},
  filename : function(req,file,cb){cb(null,file.originalname)}
})

var upload = multer({storage : storage})
app.post('/UploadCake',upload.single("file"),function(req,res){
  var cake_name = req.body.cake.name;
  var cake_categogy = req.body.cake.categogy;
  var cake_material = req.body.cake.material;
  var cake_size = req.body.cake.size;
  var cake_price = req.body.cake.price;
  var cake_quantum  = req.body.cake.quantum;
  var cake_link = req.file.path;
  var cake_idcategory;
  var MongoClient = require('mongodb').MongoClient;
  console.log(cake_material);
  console.log(cake_size);
console.log(cake_price);
console.log(cake_quantum);
console.log(cake_quantum[1]);
CakeSchema.update({cake_type:"Banh co truyen"}{
  cake : [
    {
    name_cake : cake_name,
    material: [
      for(var i = 0 ; i < cake_material.length;i++){
{name_material : cake_material[i]},
],
    size : [
      {
        name_size : "150g",
        quantum : 15,
        price: 180000
      },
      {
        name_size : "180g",
        quantum : 20,
        price: 210000
      }

  ],
    description: "Bánh được làm thủ công không chất bảo quản.",
    linkImage : "Upload\banhnuong.jpg",
    date_create: new Date(),
    not_sell :false
  },
}
).exec((err,result)=>{
console.log(result);
})
  });
