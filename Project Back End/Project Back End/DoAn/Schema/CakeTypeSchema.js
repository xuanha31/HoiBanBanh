//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

let CakeTypeSchema = new Schema({
  cake_type : {
    type : String,
    require: true
  }




}, {collection :'CakeType'});

module.exports = mongoose.model('CakeType', CakeTypeSchema);
