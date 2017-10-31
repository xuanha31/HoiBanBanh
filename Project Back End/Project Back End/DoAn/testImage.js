var express = require('express');
var app = express();
var multer = require('multer')
app.set('view engine','ejs');
app.set("views","./views");

app.listen(3000,function(){
  console.log("connect success");
});


var storage = multer.diskStorage({
  destination : function(req,file,cb){cb(null,'./UploadImage')},
  filename : function(req,file,cb){cb(null,file.originalname)}
})

var upload = multer({storage : storage})
app.post('/UploadImage',upload.single("file"),function(req,res){
  console.log(req.file)

  console.log(req.file.path)
  res.send("Success Upload")
})
app.get('/', function (req, res){
    res.render('uploadAnh',{});
});
