const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Maintenance = require('../models/maintenance');
const authMiddleware = require('../middleware/auth');

// GET All Maintenance Records
router.get('/', authMiddleware, async (req, res) => {
  try {

    const records = await Maintenance.find()
      .populate('vehicle')
      .sort({ createdAt: -1 });

    return res.status(200).json(records);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch maintenance records',
      error: error.message
    });

  }
});

// GET Single Maintenance Record
router.get('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Maintenance ID'
      });
    }

    const record = await Maintenance.findById(req.params.id)
      .populate('vehicle');

    if (!record) {
      return res.status(404).json({
        message: 'Maintenance record not found'
      });
    }

    return res.status(200).json(record);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch maintenance record',
      error: error.message
    });

  }
});

// CREATE Maintenance Record
router.post('/', authMiddleware, async (req, res) => {

  try {

    const record = await Maintenance.create(req.body);

    return res.status(201).json(record);

  } catch (error) {

    return res.status(400).json({
      message: 'Failed to create maintenance record',
      error: error.message
    });

  }
});

// UPDATE Maintenance Record
router.put('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Maintenance ID'
      });
    }

    const record = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!record) {
      return res.status(404).json({
        message: 'Maintenance record not found'
      });
    }

    return res.status(200).json(record);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to update maintenance record',
      error: error.message
    });

  }
});

// DELETE Maintenance Record
router.delete('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Maintenance ID'
      });
    }

    const record = await Maintenance.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        message: 'Maintenance record not found'
      });
    }

    return res.status(200).json({
      message: 'Maintenance record deleted successfully'
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to delete maintenance record',
      error: error.message
    });

  }
});

module.exports = router;