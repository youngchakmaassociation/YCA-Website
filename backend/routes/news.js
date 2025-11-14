const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const News = require('../models/News');

const router = express.Router();

// @desc    Get all news/events
// @route   GET /api/news
// @access  Public
router.get('/', async (req, res) => {
  try {
    let query = { isPublished: true };

    // Filtering
    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.type) {
      query.type = req.query.type;
    }

    if (req.query.zone) {
      query.zone = req.query.zone;
    }

    if (req.query.branch) {
      query.branch = req.query.branch;
    }

    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // Default: newest first
    if (req.query.sort === 'oldest') {
      sortOptions = { createdAt: 1 };
    } else if (req.query.sort === 'popular') {
      sortOptions = { views: -1 };
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const total = await News.countDocuments(query);
    const news = await News.find(query)
      .populate('author', 'name email')
      .populate('zone', 'name')
      .populate('branch', 'name')
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit);

    // Pagination result
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit,
      hasNext: page * limit < total,
      hasPrev: page > 1
    };

    res.status(200).json({
      success: true,
      count: news.length,
      pagination,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get single news/event
// @route   GET /api/news/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'name email profileImage')
      .populate('zone', 'name')
      .populate('branch', 'name');

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create news/event
// @route   POST /api/news
// @access  Private/Admin or Executive
router.post('/', protect, authorize('admin', 'executive'), async (req, res) => {
  try {
    // Add author to the request body
    req.body.author = req.user._id;

    const news = await News.create(req.body);

    res.status(201).json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update news/event
// @route   PUT /api/news/:id
// @access  Private/Admin or Author
router.put('/:id', protect, async (req, res) => {
  try {
    let news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    // Check ownership or admin role
    if (news.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this news/event'
      });
    }

    news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('author', 'name email')
      .populate('zone', 'name')
      .populate('branch', 'name');

    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete news/event
// @route   DELETE /api/news/:id
// @access  Private/Admin or Author
router.delete('/:id', protect, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    // Check ownership or admin role
    if (news.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this news/event'
      });
    }

    await news.remove();

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

// @desc    Like/Unlike news
// @route   PUT /api/news/:id/like
// @access  Private
router.put('/:id/like', protect, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    const likeIndex = news.likes.findIndex(
      like => like.user.toString() === req.user._id.toString()
    );

    if (likeIndex > -1) {
      // Unlike
      news.likes.splice(likeIndex, 1);
    } else {
      // Like
      news.likes.push({ user: req.user._id });
    }

    await news.save();

    res.status(200).json({
      success: true,
      data: {
        likesCount: news.likes.length,
        isLiked: likeIndex === -1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Add comment to news
// @route   POST /api/news/:id/comments
// @access  Private
router.post('/:id/comments', protect, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    const newComment = {
      user: req.user._id,
      content: req.body.content
    };

    news.comments.push(newComment);
    await news.save();

    // Populate the new comment
    await news.populate('comments.user', 'name email profileImage');

    const addedComment = news.comments[news.comments.length - 1];

    res.status(201).json({
      success: true,
      data: addedComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get comments for news
// @route   GET /api/news/:id/comments
// @access  Public
router.get('/:id/comments', async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('comments.user', 'name email profileImage')
      .select('comments');

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    res.status(200).json({
      success: true,
      count: news.comments.length,
      data: news.comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
