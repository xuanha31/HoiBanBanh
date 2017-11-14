//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

let CakeSchema = new Schema({
        name_size : {
          type: String ,
          require : true
        },
        quantum :{
          type : Number ,
          require :true
        },
        price :{
          type : Number,
          require: true
        },
        status :{
            type : Boolean,
            require: true
        }
      }



}, {collection :'Cake'});

module.exports = mongoose.model('Cake', CakeSchema);
