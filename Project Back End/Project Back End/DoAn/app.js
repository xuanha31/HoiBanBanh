//1.require mongoose
const mongoose = require('mongoose')
const cakeModel = require('./Schema/CakeSchema');
const EventModel = require('./Schema/EventSchema');
const BlogModel = require('./Schema/BlogSchema');
const humanModel = require('./Schema/HumanSchema');
const cakeTypeModel = require('./Schema/CakeTypeSchema');
const BillModel = require('./Schema/BillSchema');

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
  db.collection("CakeType").find().toArray(function(err, resultCakeCategory) {
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
  var cake_quantity = req.body.cake.quantity;
  var cake_description = req.body.cake.description;
  var cake_link = req.file.path;
  var cake_idcategory;
  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var id = require('mongodb').ObjectID(cake_categogy);

        cakeModel.create({
          cake_type_ids : id,
          name_cake : cake_name ,
          price : cake_price,
          material : cake_material,
          name_size : cake_size ,
          linkImage : cake_link,
          quantity : cake_quantity,
          description : cake_description,
          status: false,
          date_create: new Date()

      });

    db.collection("CakeType").find().toArray(function(err, resultCakeCategory) {
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
    console.log(users);
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("Human").find({name:{users}}).toArray(function(err, result) {
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

  	var query = { name_cake : cake };
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
      db.collection('Human').find({$or: [ {email: email }, { phone: phone} ] }).toArray(function(err,result){
        if(result.length > 0 ){
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
        }

    db.close
    })


  });
  res.render("Themnhanvien",{});
});

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
//UpdateHuman
app.get('/InfoUpdateStaff',function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("Human").find({ _id: id , role : 2}).toArray(function(err, result) {
      if(result.length > 0 ){
        res.render("CapNhatKhach", {result: result});
        db.close();
      }else{
          db.collection("Human").find().toArray(function(err, result) {
          res.render("QuanLyKhach", {result : result});
          db.close();
      })
    }

  });
    });
})
app.post('/UpdateStaff',function(req,res){
  var o_id = req.body.staff.id;
  var id = require('mongodb').ObjectID(o_id);
  var MongoClient = require('mongodb').MongoClient
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myquery = { _id : id };
  var newvalues = {
    name: req.body.staff.name,
    address: req.body.staff.address ,
    password : req.body.staff.password ,
    phone : req.body.staff.phone ,
    email : req.body.staff.email ,
    note :  req.body.staff.note,
    date_update : new Date()  };
  var newvalue = {email : req.body.staff.email};
  db.collection("Human").updateOne(myquery, {$set :newvalues}, function(err, result) {
    db.close();
  });
  db.collection("Human").find().toArray(function(err, result) {
  res.render("QuanLyKhach", {result : result});
  db.close();
})
});
})
//Update cake
app.get('/InfoUpdateCake',function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    db.collection("Cake").find({ _id: id}).toArray(function(err, result) {
      if(result.length > 0 ){
        res.render("CapNhatbanh", {result: result});
        db.close();
      }else{
          db.collection("Cake").find().toArray(function(err, result) {
          res.render("QuanLybanh", {result : result});
          db.close();
      })
    }

  });
    });
})


app.post('/UpdateCake',upload.single("file"),function(req,res){
  var o_id = req.body.cake.id;
  var id = require('mongodb').ObjectID(o_id);
  var MongoClient = require('mongodb').MongoClient
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myquery = { _id : id };
  console.log(req.body.cake.quantity);
  var newvalues = {
    name_cake: req.body.cake.name,
    description: req.body.cake.description ,
    name_size : req.body.cake.size ,
    price : req.body.cake.price ,
    quantity : req.body.cake.quantity ,
    linkImage :  req.file.path,
    };

  db.collection("Cake").updateOne(myquery, {$set :newvalues}, function(err, result) {
    db.close();
  });
  db.collection("Cake").find().toArray(function(err, result) {
  res.render("QuanLybanh", {result : result});
  db.close();
})
});
})
//Category Manager

app.get('/CakeCategoryManage', function (req, res){
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("CakeType").find().toArray(function(err, result) {
    res.render("QuanlyDanhMuc", {result : result});
    db.close();
});
  });
});

//Login
app.get('/DangNhap',function(req,res){
  res.render("login",{});
});
app.post('/Login',function(req,res){
  var email = req.body.human.email;
  var password= req.body.human.password;
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("Human").find({email:email,password:password}).toArray(function(err, result) {
      if(result.length > 0){
        if(result[0].role == 2){
            res.render("QuanlyBanh",{});
        }else if(result[0].role == 3){
          res.render("Home",{});
        }else{
          res.render("Themsukien",{})
        }
      }else{
        console.log("user or pass wrong");
        res.render("login",{});
      }


      db.close();
  });
    });
})

//bill
app.get('/Bill',function(req,res){
  var date= new Date();
  console.log(date);

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection('Bill').find({
    time : {"$lt": date}
    }).toArray(function(err, result) {
    res.render("Donhang",{result:result});
    })


    db.close();
});
})

app.get('/ConfirmBill',function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  var date= new Date();
  console.log(id);
BillModel.update({_id : id},{confirm : true}).exec((err,result)=>{console.log(result)});
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection('Bill').find({
    time : {"$lt": date}
    }).toArray(function(err, result) {
    res.render("Donhang",{result:result});
    })


    db.close();
});
})


app.get('/UnConfirmBill',function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  var date= new Date();
  console.log(id);
BillModel.update({_id : id},{confirm : false}).exec((err,result)=>{console.log(result)});
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection('Bill').find({
    time : {"$lt": date}
    }).toArray(function(err, result) {
    res.render("Donhang",{result:result});
    })


    db.close();
});
})

app.get('/BlockUser',function(req,res){
  var nameuser_o_id = req.param('id');
  var id = require('mongodb').ObjectID(nameuser_o_id);
  var date= new Date();

humanModel.update({_id : id},{black_list : true}).exec((err,result)=>{console.log(result)});
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("Human").find().toArray(function(err, result) {
    res.render("QuanLyKhach", {result : result});
    db.close();
});

});
})

app.get('/UnBlockUser',function(req,res){
  var nameuser_o_id = req.param('id');
  var id = require('mongodb').ObjectID(nameuser_o_id);
  var date= new Date();

humanModel.update({_id : id},{black_list : false}).exec((err,result)=>{console.log(result)});
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("Human").find().toArray(function(err, result) {
    res.render("QuanLyKhach", {result : result});
    db.close();
});

});
})
