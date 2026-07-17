const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Alert = require('../models/alerts');
const authMiddleware = require('../middleware/auth');

// GET All Alerts
router.get('/', authMiddleware, async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate('vehicle')
      .populate('driver')
      .sort({ createdAt: -1 });

    return res.status(200).json(alerts);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch alerts',
      error: error.message
    });
  }
});

// GET Single Alert
router.get('/:id', authMiddleware, async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Alert ID' });
    }

    const alert = await Alert.findById(req.params.id)
      .populate('vehicle')
      .populate('driver');

    if (!alert) {
      return res.status(404).json({
        message: 'Alert not found'
      });
    }

    return res.status(200).json(alert);

  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch alert',
      error: error.message
    });
  }
});

// CREATE Alert
router.post('/', authMiddleware, async (req, res) => {
  try {

    const alert = await Alert.create(req.body);

    return res.status(201).json(alert);

  } catch (error) {

    return res.status(400).json({
      message: 'Failed to create alert',
      error: error.message
    });

  }
});

// UPDATE Alert
router.put('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Alert ID'
      });
    }

    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!alert) {
      return res.status(404).json({
        message: 'Alert not found'
      });
    }

    return res.status(200).json(alert);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to update alert',
      error: error.message
    });

  }
});

// DELETE Alert
router.delete('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Alert ID'
      });
    }

    const alert = await Alert.findByIdAndDelete(req.params.id);

    if (!alert) {
      return res.status(404).json({
        message: 'Alert not found'
      });
    }

    return res.status(200).json({
      message: 'Alert deleted successfully'
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to delete alert',
      error: error.message
    });

  }
});

module.exports = router;