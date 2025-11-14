const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Election title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  type: {
    type: String,
    enum: ['central', 'zonal', 'branch'],
    required: [true, 'Election type is required']
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone'
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  },
  positions: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    maxCandidates: {
      type: Number,
      default: 1
    },
    candidates: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      manifesto: {
        type: String,
        trim: true
      },
      votes: {
        type: Number,
        default: 0
      }
    }]
  }],
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  totalVotes: {
    type: Number,
    default: 0
  },
  eligibleVoters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  results: [{
    position: {
      type: String,
      required: true
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    votes: {
      type: Number,
      default: 0
    },
    runnerUp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    runnerUpVotes: {
      type: Number,
      default: 0
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
electionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Validate dates
electionSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    return next(new Error('End date must be after start date'));
  }
  next();
});

// Update status based on dates
electionSchema.methods.updateStatus = function() {
  const now = new Date();
  if (now < this.startDate) {
    this.status = 'upcoming';
  } else if (now >= this.startDate && now <= this.endDate) {
    this.status = 'active';
  } else {
    this.status = 'completed';
  }
};

module.exports = mongoose.model('Election', electionSchema);
