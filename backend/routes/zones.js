const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Zone = require('../models/Zone');
const User = require('../models/User');

const router = express.Router();

// @desc    Get all zones
// @route   GET /api/zones
// @access  Public
router.get('/', async (req, res) => {
  try {
    const zones = await Zone.find({ isActive: true }).populate('coordinator', 'name email');

    // Add branch count for each zone
    const zonesWithBranchCount = await Promise.all(
      zones.map(async (zone) => {
        const branchCount = await Branch.countDocuments({
          zone: zone._id,
          isActive: true
        });
        return {
          ...zone.toObject(),
          branchCount
        };
      })
    );

    res.status(200).json({
      success: true,
      count: zones.length,
      data: zonesWithBranchCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get single zone
// @route   GET /api/zones/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id).populate('coordinator', 'name email');

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: 'Zone not found'
      });
    }

    res.status(200).json({
      success: true,
      data: zone
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get branches for a specific zone
// @route   GET /api/zones/:id/branches
// @access  Public
router.get('/:id/branches', async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: 'Zone not found'
      });
    }

    const branches = await Branch.find({
      zone: req.params.id,
      isActive: true
    })
      .populate('president', 'name email')
      .populate('secretary', 'name email')
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: branches.length,
      data: branches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get all zones with their branches populated
// @route   GET /api/zones/with-branches
// @access  Public
router.get('/with-branches', async (req, res) => {
  try {
    const zones = await Zone.find({ isActive: true })
      .populate('coordinator', 'name email')
      .sort({ name: 1 });

    // Get branches for each zone
    const zonesWithBranches = await Promise.all(
      zones.map(async (zone) => {
        const branches = await Branch.find({
          zone: zone._id,
          isActive: true
        })
          .populate('president', 'name email')
          .populate('secretary', 'name email')
          .sort({ name: 1 });

        return {
          ...zone.toObject(),
          branches: branches,
          branchCount: branches.length
        };
      })
    );

    res.status(200).json({
      success: true,
      count: zones.length,
      data: zonesWithBranches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new zone
// @route   POST /api/zones
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const zone = await Zone.create(req.body);

    res.status(201).json({
      success: true,
      data: zone
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update zone
// @route   PUT /api/zones/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: 'Zone not found'
      });
    }

    res.status(200).json({
      success: true,
      data: zone
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete zone
// @route   DELETE /api/zones/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: 'Zone not found'
      });
    }

    // Check if zone has members
    const memberCount = await User.countDocuments({ zone: req.params.id, isActive: true });
    if (memberCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete zone with active members'
      });
    }

    await zone.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
