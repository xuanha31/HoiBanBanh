//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

let CakeCategorySchema = new Schema({
  name :{
    type : String,
    require:true
}

}, {collection :'CakeCategory'});

module.exports = mongoose.model('CakeCategory', CakeCategorySchema);
