const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Branch = require('../models/Branch');
const Zone = require('../models/Zone');

const router = express.Router();

// @desc    Get all branches
// @route   GET /api/branches
// @access  Public
router.get('/', async (req, res) => {
  try {
    const branches = await Branch.find({ isActive: true })
      .populate('zone', 'name description headquarters region')
      .populate('president', 'name email')
      .populate('secretary', 'name email')
      .sort({ 'zone.name': 1, name: 1 });

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

// @desc    Get branches by zone
// @route   GET /api/branches/zone/:zoneId
// @access  Public
router.get('/zone/:zoneId', async (req, res) => {
  try {
    const branches = await Branch.find({
      zone: req.params.zoneId,
      isActive: true
    })
      .populate('zone', 'name description headquarters region')
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

// @desc    Get branches grouped by zones
// @route   GET /api/branches/grouped-by-zones
// @access  Public
router.get('/grouped-by-zones', async (req, res) => {
  try {
    const branches = await Branch.find({ isActive: true })
      .populate('zone', 'name description headquarters region')
      .populate('president', 'name email')
      .populate('secretary', 'name email')
      .sort({ 'zone.name': 1, name: 1 });

    // Group branches by zone
    const groupedBranches = {};
    branches.forEach(branch => {
      const zoneName = branch.zone?.name || 'Unassigned';
      if (!groupedBranches[zoneName]) {
        groupedBranches[zoneName] = {
          zone: branch.zone,
          branches: [],
          count: 0
        };
      }
      groupedBranches[zoneName].branches.push(branch);
      groupedBranches[zoneName].count++;
    });

    res.status(200).json({
      success: true,
      count: Object.keys(groupedBranches).length,
      data: groupedBranches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get single branch
// @route   GET /api/branches/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id)
      .populate('zone', 'name description')
      .populate('president', 'name email phone')
      .populate('secretary', 'name email phone');

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    res.status(200).json({
      success: true,
      data: branch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new branch
// @route   POST /api/branches
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    // Check if zone exists
    const zone = await Zone.findById(req.body.zone);
    if (!zone) {
      return res.status(404).json({
        success: false,
        message: 'Zone not found'
      });
    }

    const branch = await Branch.create(req.body);

    res.status(201).json({
      success: true,
      data: branch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update branch
// @route   PUT /api/branches/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('zone', 'name')
      .populate('president', 'name email')
      .populate('secretary', 'name email');

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    res.status(200).json({
      success: true,
      data: branch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete branch
// @route   DELETE /api/branches/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    await branch.remove();

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
