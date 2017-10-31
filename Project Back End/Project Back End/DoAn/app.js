//1.require mongoose
const mongoose = require('mongoose')
const CakeCategoryModel = require('./Schema/CakeCategorySchema');
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
app.get('/InsertCake', function(req,res){
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
// upload Image c
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
    db.collection("CakeCategory").find().toArray(function(err, resultCakeCategory) {
      res.render("Themmaubanh", {resultCakeCategory : resultCakeCategory});
      db.close();
      })
});
  });
  app.get('/InsertEvent', function(req,res){
    res.render("Themsukien",{});
  })
app.post('/UploadEvent',upload.single("file"),function(req,res){
    var event_title = req.body.event.title;
    var event_content = req.body.event.content;
    var event_link = req.file.path;

    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;

      EventModel.create({
      title : event_title,
      content : event_content,
      link : event_link,
      date_create: new Date()
  })
    res.render("Themsukien",{})
  });
    });

    app.get('/InsertBlog', function(req,res){
      res.render("Themblog",{});
    })
  app.post('/UploadBlog',upload.single("file"),function(req,res){
      var blog_title = req.body.blog.title;
      var blog_content = req.body.blog.content;
      var blog_link = req.file.path;

      var MongoClient = require('mongodb').MongoClient;
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        BlogModel.create({
        title : blog_title,
        content : blog_content,
        link : blog_link,
        date_create: new Date()
    })
      res.render("Themblog",{})
    });
      });

  app.get('/BlogManage',function(req,res){
      var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
        db.collection("Blog").find().toArray(function(err, result) {
            res.render("Quanlyblog",{result: result});
        })
    })
  });

  app.get('/SearchBlog', function (req, res){

      var title = req.param('title');
      var MongoClient = require('mongodb').MongoClient;
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("Blog").find({title:title}).toArray(function(err, result) {
          res.render("Quanlyblog", {result : result});
          db.close();

      });
        });

  });

  app.get("/Home",function(req,res){
    res.render("Home",{})
  });

  app.get('/HumanManage',function(req,res){
      var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
        db.collection("Human").find().toArray(function(err, result) {
            res.render("QuanLyKhach",{result: result});
        })
    })
  });

  app.get('/PrintAccountSearch.js?', function (req, res){
//get value from textbox
    var user = req.param('user');
  console.log("Da Den Print 2");
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("Human").find({name:user}).toArray(function(err, result) {
      res.render("QuanLyKhach", {result : result});
      db.close();

  });
    });

  });
  app.get('/CakeManage', function (req, res){
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("Cake").find().toArray(function(err, result) {
      res.render("QuanlyBanh", {result : result});
      db.close();
  });
    });
  });
  app.get('/PrintCakeSearch?', function (req, res){
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
  app.get('/Staff',function(req,res){
      res.render("Themnhanvien",{});
  });
  app.post('/InsertStaff',upload.single("file"),function(req,res){
    var name = req.body.staff.name;
    var password= req.body.staff.password;
    var address = req.body.staff.address;
    var phone = req.body.staff.phone;
    var email = req.body.staff.email;
    var note  = req.body.staff.note;
    var link = req.file.path;

    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;

      humanModel.create({
        name : name,
        phone : phone,
        password: password,
        email : email,
        address : address,
        role :2,
        note : note,
        linkImage: link,
        date_create: new Date(),
        date_update: new Date(),
        black_list : false
      });

  });
  res.render("Themnhanvien",{});
});

app.get('/Category',function(req,res){
    res.render("ThemDanhMuc",{});
});
app.get('/InsertCategory',function(req,res){
  var name_category = req.param('category');
  CakeCategoryModel.create({
    name : name_category
  });
    res.render("ThemDanhMuc",{});
});
