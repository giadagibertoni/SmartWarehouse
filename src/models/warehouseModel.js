var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoodSchema = new Schema({
  name: {
    type: String,
    required: "A name is required"
  },
  stock: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    required: "A type of this good is required"
  },
  image: {
    type: String
  },
  supplier: {
    type: String
  },
  logo_supplier: {
    type: String
  },
  min_stock: {
    type: Number,
    required: "Insert a minimum number of stock"
  }
},{ collection: 'good'});

var Good = mongoose.model('good', GoodSchema);
module.exports = Good;

var StaffSchema = new Schema({
  name:{
    type: String,
    required: "A name is required"
  },
  surname:{
    type: String,
    required: "A surname is required"
  },
  username:{
    type: String,
    required: "A username is required"
  },
  password:{
    type: String,
    required: "A password is required"
  },

  warehouseMovements:[{
      _id: false,
      date : Date,
      movement : Number
  }]
},{ collection: 'staff'});

var Staff = mongoose.model('staff', StaffSchema);
module.exports = Staff;
