//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

let BlogSchema = new Schema({
  title :{
    type : String,
    require:true
  },
  content:{
    type : String,
    require : true
  },
  link:{
    type:String
  },
  date_create:{
    type : Date,
    require: true
  }

}, {collection :'Blog'});

module.exports = mongoose.model('Blog', BlogSchema);
