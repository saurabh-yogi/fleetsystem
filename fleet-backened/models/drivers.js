const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    licenseExpiry: {
      type: Date
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive', 'On Trip'],
      default: 'Active'
    },

    assignedVehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle'
    },

    address: {
      type: String,
      trim: true
    },

    joiningDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Driver', driverSchema);