const BillModel = require('../Schema/BillSchema');
const config = require('../config.json');
const mongoose = require('mongoose')

mongoose.connect(config.connectionString,(err)=>{
  if(err){
    console.log(err);
  }else {
    console.log('connect db success');;
  }
})


BillModel.create({
  name_id:"5a089cfa08986c4404799c81",
  name: "Kien",
  phone : "01234556781",
  address : " Ha Noi",
  email : "kiennt@gmail.com",
  cake:[{
  cake_name: "Bánh Nướng",
  price : 180000,
  quantity : 3},{
  cake_name : "Bánh Dẻo Nhân Đậu Xanh",
  price : 100000,
  quantity : 2}
  ],
  confirm : false,
  time : new Date ()

});
mongoose.connection.close();
