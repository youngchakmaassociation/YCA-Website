const mongoose = require('mongoose');

// Get database connections
let contentConnection;
try {
  // This will be set when the model is initialized with a connection
  contentConnection = mongoose;
} catch (error) {
  contentConnection = mongoose;
}

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: [300, 'Excerpt cannot be more than 300 characters']
  },
  category: {
    type: String,
    enum: ['announcement', 'circular', 'meeting', 'notice', 'press-release', 'event'],
    required: [true, 'Category is required']
  },
  type: {
    type: String,
    enum: ['news', 'event'],
    default: 'news'
  },
  eventDate: {
    type: Date
  },
  eventLocation: {
    type: String,
    trim: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      trim: true
    },
    caption: {
      type: String,
      trim: true
    }
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone'
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
newsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();

  // Set publishedAt when isPublished becomes true
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Generate excerpt from content if not provided
newsSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    // Remove HTML tags and get first 300 characters
    const plainText = this.content.replace(/<[^>]*>/g, '');
    this.excerpt = plainText.substring(0, 297) + (plainText.length > 297 ? '...' : '');
  }
  next();
});

// Index for search
newsSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('News', newsSchema);
