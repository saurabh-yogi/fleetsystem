const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Document = require('../models/documents');
const authMiddleware = require('../middleware/auth');

// GET All Documents
router.get('/', authMiddleware, async (req, res) => {
  try {
    const documents = await Document.find()
      .populate('vehicle')
      .populate('driver')
      .sort({ createdAt: -1 });

    return res.status(200).json(documents);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch documents',
      error: error.message
    });

  }
});

// GET Single Document
router.get('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Document ID'
      });
    }

    const document = await Document.findById(req.params.id)
      .populate('vehicle')
      .populate('driver');

    if (!document) {
      return res.status(404).json({
        message: 'Document not found'
      });
    }

    return res.status(200).json(document);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch document',
      error: error.message
    });

  }
});

// CREATE Document
router.post('/', authMiddleware, async (req, res) => {

  try {

    const document = await Document.create(req.body);

    return res.status(201).json(document);

  } catch (error) {

    return res.status(400).json({
      message: 'Failed to create document',
      error: error.message
    });

  }
});

// UPDATE Document
router.put('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Document ID'
      });
    }

    const document = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!document) {
      return res.status(404).json({
        message: 'Document not found'
      });
    }

    return res.status(200).json(document);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to update document',
      error: error.message
    });

  }
});

// DELETE Document
router.delete('/:id', authMiddleware, async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid Document ID'
      });
    }

    const document = await Document.findByIdAndDelete(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: 'Document not found'
      });
    }

    return res.status(200).json({
      message: 'Document deleted successfully'
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to delete document',
      error: error.message
    });

  }
});

module.exports = router;