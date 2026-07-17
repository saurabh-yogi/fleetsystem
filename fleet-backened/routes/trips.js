const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Trip = require('../models/trips');
const authMiddleware = require('../middleware/auth');

// GET All Trips
router.get('/', authMiddleware, async (req, res) => {
  try {

    const trips = await Trip.find()
      .populate('vehicle')
      .populate('driver')
      .sort({ createdAt: -1 });

    return res.status(200).json(trips);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch trips',
      error: error.message
    });

  }
});

// GET Single Trip
router.get('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Trip ID'
      });
    }

    const trip = await Trip.findById(req.params.id)
      .populate('vehicle')
      .populate('driver');

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json(trip);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch trip',
      error: error.message
    });

  }
});

// CREATE Trip
router.post('/', authMiddleware, async (req, res) => {

  try {

    const trip = await Trip.create(req.body);

    return res.status(201).json(trip);

  } catch (error) {

    return res.status(400).json({
      message: 'Failed to create trip',
      error: error.message
    });

  }
});

// UPDATE Trip
router.put('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Trip ID'
      });
    }

    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json(trip);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to update trip',
      error: error.message
    });

  }
});

// DELETE Trip
router.delete('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Trip ID'
      });
    }

    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json({
      message: 'Trip deleted successfully'
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to delete trip',
      error: error.message
    });

  }
});

module.exports = router;