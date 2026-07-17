const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Driver = require('../models/drivers');
const authMiddleware = require('../middleware/auth');

// GET All Drivers
router.get('/', authMiddleware, async (req, res) => {
  try {

    const drivers = await Driver.find()
      .populate('assignedVehicle')
      .sort({ createdAt: -1 });

    return res.status(200).json(drivers);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch drivers',
      error: error.message
    });

  }
});

// GET Single Driver
router.get('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Driver ID'
      });
    }

    const driver = await Driver.findById(req.params.id)
      .populate('assignedVehicle');

    if (!driver) {
      return res.status(404).json({
        message: 'Driver not found'
      });
    }

    return res.status(200).json(driver);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch driver',
      error: error.message
    });

  }
});

// CREATE Driver
router.post('/', authMiddleware, async (req, res) => {

  try {

    const driver = await Driver.create(req.body);

    return res.status(201).json(driver);

  } catch (error) {

    return res.status(400).json({
      message: 'Failed to create driver',
      error: error.message
    });

  }
});

// UPDATE Driver
router.put('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Driver ID'
      });
    }

    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!driver) {
      return res.status(404).json({
        message: 'Driver not found'
      });
    }

    return res.status(200).json(driver);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to update driver',
      error: error.message
    });

  }
});

// DELETE Driver
router.delete('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Driver ID'
      });
    }

    const driver = await Driver.findByIdAndDelete(req.params.id);

    if (!driver) {
      return res.status(404).json({
        message: 'Driver not found'
      });
    }

    return res.status(200).json({
      message: 'Driver deleted successfully'
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to delete driver',
      error: error.message
    });

  }
});

module.exports = router;