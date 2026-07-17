const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    type: {
      type: String,
      required: true,
      trim: true
    },

    brand: {
      type: String,
      required: true,
      trim: true
    },

    model: {
      type: String,
      required: true,
      trim: true
    },

    year: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 1
    },

    status: {
      type: String,
      enum: ['Running', 'Stopped', 'Inactive', 'In Service'],
      default: 'Inactive'
    },

    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'CNG', 'Electric'],
      required: true
    },

    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);