const CakeCategoryModel = require('../Schema/CakeCategorySchema');
const config = require('../config.json');
const mongoose = require('mongoose')

mongoose.connect(config.connectionString,(err)=>{
  if(err){
    console.log(err);
  }else {
    console.log('connect db success');;
  }
})

CakeCategoryModel.create({
  name : "mem"

});
mongoose.connection.close();
