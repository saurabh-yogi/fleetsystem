const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Geofence = require('../models/geofence');
const authMiddleware = require('../middleware/auth');

// GET All Geofences
router.get('/', authMiddleware, async (req, res) => {
  try {

    const geofences = await Geofence.find()
      .populate('assignedVehicles')
      .sort({ createdAt: -1 });

    return res.status(200).json(geofences);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch geofences',
      error: error.message
    });

  }
});

// GET Single Geofence
router.get('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Geofence ID'
      });
    }

    const geofence = await Geofence.findById(req.params.id)
      .populate('assignedVehicles');

    if (!geofence) {
      return res.status(404).json({
        message: 'Geofence not found'
      });
    }

    return res.status(200).json(geofence);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch geofence',
      error: error.message
    });

  }
});

// CREATE Geofence
router.post('/', authMiddleware, async (req, res) => {

  try {

    const geofence = await Geofence.create(req.body);

    return res.status(201).json(geofence);

  } catch (error) {

    return res.status(400).json({
      message: 'Failed to create geofence',
      error: error.message
    });

  }
});

// UPDATE Geofence
router.put('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Geofence ID'
      });
    }

    const geofence = await Geofence.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!geofence) {
      return res.status(404).json({
        message: 'Geofence not found'
      });
    }

    return res.status(200).json(geofence);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to update geofence',
      error: error.message
    });

  }
});

// DELETE Geofence
router.delete('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Geofence ID'
      });
    }

    const geofence = await Geofence.findByIdAndDelete(req.params.id);

    if (!geofence) {
      return res.status(404).json({
        message: 'Geofence not found'
      });
    }

    return res.status(200).json({
      message: 'Geofence deleted successfully'
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to delete geofence',
      error: error.message
    });

  }
});

module.exports = router;