//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

let CakeSchema = new Schema({
  cake_type_ids:{
    type: Schema.Types.ObjectId,
    ref: 'CakeType'
},
  name_cake :{
    type : String,
    require:true
  },
  material :
  [String],
name_size : {
  type: String ,
  require : true
},
quantity :{
  type : Number ,
  require :true
},
price :{
  type : Number,
  require: true
},


description:{
  type: String
},
linkImage :{
  type : String
},
date_create :{
  type : Date,
  require: true
},
status:{
  type : Boolean,
  require : true
}




}, {collection :'Cake'});

module.exports = mongoose.model('Cake', CakeSchema);
