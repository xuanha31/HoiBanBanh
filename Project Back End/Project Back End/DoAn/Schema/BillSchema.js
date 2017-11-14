
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

let BillSchema = new Schema({
  name_id :{
    type: Schema.Types.ObjectId,
    ref: 'Human'
  },
  name :{
    type: String,
    require : true
  },
  phone :{
    type : String,
    require :true
  },
  address: {
    type : String,
    require :true
  },
  email : {
    type :String,
    require : true
  },
  cake :[{
    cake_name:{
      type: String,
      require : true
    },
    price :{
      type : Number,
      require : true
    },
    quantity :{
      type : Number,
      require : true
    }
  },

  ],
  confirm:{
    type : Boolean,
    require: true
  },
  time :{
    type : Date,
    require: true
  }
}, {collection :'Bill'});

module.exports = mongoose.model('Bill', BillSchema);
