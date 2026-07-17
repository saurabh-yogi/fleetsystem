const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Fuel = require('../models/fuel');
const authMiddleware = require('../middleware/auth');

// GET All Fuel Records
router.get('/', authMiddleware, async (req, res) => {
  try {

    const records = await Fuel.find()
      .populate('vehicle')
      .populate('driver')
      .sort({ createdAt: -1 });

    return res.status(200).json(records);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch fuel records',
      error: error.message
    });

  }
});

// GET Single Fuel Record
router.get('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Fuel Record ID'
      });
    }

    const record = await Fuel.findById(req.params.id)
      .populate('vehicle')
      .populate('driver');

    if (!record) {
      return res.status(404).json({
        message: 'Fuel record not found'
      });
    }

    return res.status(200).json(record);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch fuel record',
      error: error.message
    });

  }
});

// CREATE Fuel Record
router.post('/', authMiddleware, async (req, res) => {

  try {

    // Optional business logic:
    // req.body.totalCost = req.body.liters * req.body.pricePerLiter;

    const record = await Fuel.create(req.body);

    return res.status(201).json(record);

  } catch (error) {

    return res.status(400).json({
      message: 'Failed to create fuel record',
      error: error.message
    });

  }
});

// UPDATE Fuel Record
router.put('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Fuel Record ID'
      });
    }

    const record = await Fuel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!record) {
      return res.status(404).json({
        message: 'Fuel record not found'
      });
    }

    return res.status(200).json(record);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to update fuel record',
      error: error.message
    });

  }
});

// DELETE Fuel Record
router.delete('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Fuel Record ID'
      });
    }

    const record = await Fuel.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        message: 'Fuel record not found'
      });
    }

    return res.status(200).json({
      message: 'Fuel record deleted successfully'
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to delete fuel record',
      error: error.message
    });

  }
});

module.exports = router;