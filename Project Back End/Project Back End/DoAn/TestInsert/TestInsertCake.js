const cakeModel = require('../Schema/CakeSchema');
const config = require('../config.json');
const mongoose = require('mongoose')

mongoose.connect(config.connectionString,(err)=>{
  if(err){
    console.log(err);
  }else {
    console.log('connect db success');;
  }
})


cakeModel.create({
  name : "gau",
  cake_category: "59d3ac817f6d88167032e6d4",
  price : 1234,
  material: "59d3ab74c2a3f724246bf1d8",
  size : "50x50",
  linkImage : "Upload\bannel1.png",
  quantum : 100,
  date_create: new Date()

});
mongoose.connection.close();
