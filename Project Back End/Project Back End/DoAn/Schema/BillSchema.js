/1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

let Bill = new Schema({
  name :{
    type : Schema.Types.ObjectId
    ref : 'Bill'
  }
  cake :{
    type : Schema.Types.ObjectId
  }
  price :{
    type : Number
  }
  quantity :{
    type : Number
  }
  time :{
    createdAt: 'created_at'
  }
}, {collection :'Bill'});

module.exports = mongoose.model('Bill', Bill);
