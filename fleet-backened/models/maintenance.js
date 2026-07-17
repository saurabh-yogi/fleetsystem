const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema(
{
  vehicle:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Vehicle',
    required:true
  },

  type:{
    type:String,
    required:true,
    enum:[
      'Oil Change',
      'Tyre Change',
      'Brake Service',
      'Engine Service',
      'General Service',
      'Others'
    ]
  },

  description:{
    type:String,
    trim:true
  },

  cost:{
    type:Number,
    required:true,
    min:0
  },

  date:{
    type:Date,
    required:true
  },

  nextServiceDate:{
    type:Date
  },

  status:{
    type:String,
    enum:[
      'Scheduled',
      'In Progress',
      'Completed'
    ],
    default:'Scheduled'
  },

  workshop:{
    type:String,
    trim:true
  }

},
{
 timestamps:true
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);