//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

let EventSchema = new Schema({
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

}, {collection :'Event'});

module.exports = mongoose.model('Event', EventSchema);
