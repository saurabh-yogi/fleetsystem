const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        'High Fuel Consumption',
        'Maintenance Due',
        'Geofence Breach',
        'Insurance Expiring',
        'License Expiring',
        'Other'
      ]
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle'
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver'
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ['Read', 'Unread', 'Resolved'],
      default: 'Unread'
    },

    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Alert', alertSchema);