const mongoose = require('mongoose');

const geofenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    coordinates: {
      latitude: {
        type: Number,
        required: true
      },

      longitude: {
        type: Number,
        required: true
      }
    },

    radius: {
      type: Number,
      required: true,
      min: 1
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },

    assignedVehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Geofence', geofenceSchema);