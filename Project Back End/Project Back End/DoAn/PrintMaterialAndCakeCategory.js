//1.require mongoose
const mongoose = require('mongoose')
const CakeCategoryModel = require('./Schema/CakeCategorySchema');
const cakeModel = require('./Schema/CakeSchema');
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
app.set("views","./views");

app.use(express.static(__dirname + '/views'));
server.listen(3000);
mongoose.connect(config.connectionString,(err)=>{
  if(err){
    console.log(err);
  }else {
    console.log('connect db success');;
  }
})
app.get('/Prepare', function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
  db.collection("CakeCategory").find().toArray(function(err, resultCakeCategory) {
    res.render("Themmaubanh", {resultCakeCategory : resultCakeCategory});
    db.close();
    })
  })
})
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({
    extended: true
}));
// upload Image
var storage = multer.diskStorage({
  destination : function(req,file,cb){cb(null,'./Upload')},
  filename : function(req,file,cb){cb(null,file.originalname)}
})

var upload = multer({storage : storage})
app.post('/Upload',upload.single("file"),function(req,res){
  var cake_name = req.body.cake.name;
  var cake_categogy = req.body.cake.categogy;
  var cake_material = req.body.cake.material;
  var cake_size = req.body.cake.size;
  var cake_price = req.body.cake.price;
  var cake_quantum  = req.body.cake.quantum;
  var cake_link = req.file.path;
  var cake_idcategory;
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    db.collection("CakeCategory").find({name:cake_categogy}, {"_id": 1}).toArray(function(err, result) {
        cake_idcategory=result[0]._id;
        console.log(cake_idcategory);
        console.log(cake_link);
        cakeModel.create({
          name : cake_name ,
          cake_category: cake_idcategory,
          price : cake_price,
          material: cake_material,
          size : cake_size ,
          linkImage : cake_link,
          quantum : cake_quantum,
          date_create: new Date()

        });

      })
  res.render("Home",{})
});
  });
