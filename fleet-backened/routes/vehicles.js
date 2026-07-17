const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Vehicle = require('../models/vehicle');
const authMiddleware = require('../middleware/auth');

// GET All Vehicles
router.get('/', authMiddleware, async (req, res) => {
  try {

    const vehicles = await Vehicle.find()
      .populate('assignedDriver')
      .sort({ createdAt: -1 });

    return res.status(200).json(vehicles);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch vehicles',
      error: error.message
    });

  }
});

// GET Single Vehicle
router.get('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Vehicle ID'
      });
    }

    const vehicle = await Vehicle.findById(req.params.id)
      .populate('assignedDriver');

    if (!vehicle) {
      return res.status(404).json({
        message: 'Vehicle not found'
      });
    }

    return res.status(200).json(vehicle);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch vehicle',
      error: error.message
    });

  }
});

// CREATE Vehicle
router.post('/', authMiddleware, async (req, res) => {

  try {

    const vehicle = await Vehicle.create(req.body);

    return res.status(201).json(vehicle);

  } catch (error) {

    return res.status(400).json({
      message: 'Failed to create vehicle',
      error: error.message
    });

  }
});

// UPDATE Vehicle
router.put('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Vehicle ID'
      });
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!vehicle) {
      return res.status(404).json({
        message: 'Vehicle not found'
      });
    }

    return res.status(200).json(vehicle);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to update vehicle',
      error: error.message
    });

  }
});

// DELETE Vehicle
router.delete('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Vehicle ID'
      });
    }

    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        message: 'Vehicle not found'
      });
    }

    return res.status(200).json({
      message: 'Vehicle deleted successfully'
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to delete vehicle',
      error: error.message
    });

  }
});

module.exports = router;