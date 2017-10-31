//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

let MaterialSchema = new Schema({
  name :{
    type : String,
    require:true
}
}, {collection :'Material'});

module.exports = mongoose.model('Material', MaterialSchema);
