//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

let HumanSchema = new Schema({
  name :{
    type : String,
    require:true
  },
  phone :{
    type : Number ,
    require: true
  },
  password :{
    type : String,
    require: true
  },
  email :{
    type : String ,
    require: true
  },
  address :{
    type : String,
    require : true
  },
  role :{
    type : Number ,
    require :true
  },
  note : {
    type : String
  },
  date_create :{
    type : Date,
    require: true
  },
  date_update :{
    type : Date,
    require: true
  },
  black_list :{
    type : Boolean,
    require: true
  }

}, {collection :'Human'});

module.exports = mongoose.model('Human', HumanSchema);
