//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

let CakeSchema = new Schema({
  name :{
    type : String,
    require:true
  },
  cake_category :{
    type: Schema.Types.ObjectId,
    ref: 'CakeCategory'
  },
  price :{
    type : Number,
    require: true
  },
  material :{
    type: String
  },
  size:{
    type: String,
    require: true
  },
  linkImage :{
    type : String
  },
  quantum :{
    type : Number ,
    require :true
  },
  date_create :{
    type : Date,
    require: true
  }

}, {collection :'Cake'});

module.exports = mongoose.model('Cake', CakeSchema);
