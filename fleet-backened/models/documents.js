const mongoose = require('mongoose');

const documentsSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  type:{
    type:String,
    enum:['Insurance', 'Registeration', 'Permit', 'License', 'Other'],
    required:true
  },
  vehicle:{
    type:mongoose.Schema.ObjectId,
    ref:'Vehicle'
  },
  driver:{
    type:mongoose.Schema.ObjectId,
    ref:'Driver'
  },
  expiryDate:{
    type:Date
  },
  fileUrl:{
    type:String
  },
  status:{
    type:String,
    enum:['Valid', 'Expired', 'Expiring Soon'],
    default:'Valid'
  }
},{timestamps:true})

module.exports = mongoose.model('Documents', documentsSchema);