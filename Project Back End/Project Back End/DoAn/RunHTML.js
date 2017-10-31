var http = require("http");
var fs = require("fs");

http.createServer(function(req,res){
  res.writeHead(200,{"Content-Type":"text/html"});
  var data = fs.readFileSync(__dirname+"/QuanLyKhach.html","utf-8");
  console.log(data);
  res.end(data);
  

}).listen(3000)
