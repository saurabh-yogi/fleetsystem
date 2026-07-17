const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    liters: {
      type: Number,
      required: true,
      min: 1
    },

    pricePerLiter: {
      type: Number,
      required: true,
      min: 1
    },

    totalCost: {
      type: Number,
      required: true,
      min: 0
    },

    location: {
      type: String,
      trim: true
    },

    odometer: {
      type: Number,
      min: 0
    },

    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Fuel', fuelSchema);