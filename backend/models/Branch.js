const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Branch name is required'],
    trim: true,
    maxlength: [100, 'Branch name cannot be more than 100 characters']
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone',
    required: [true, 'Zone is required']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  president: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  secretary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  contactEmail: {
    type: String,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  contactPhone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  memberCount: {
    type: Number,
    default: 0
  },
  lastElection: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
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
branchSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Update member count when users are added/removed
branchSchema.methods.updateMemberCount = async function() {
  const User = mongoose.model('User');
  this.memberCount = await User.countDocuments({ branch: this._id, isActive: true });
  await this.save();
};

// Compound index to ensure unique branch names within a zone
branchSchema.index({ name: 1, zone: 1 }, { unique: true });

module.exports = mongoose.model('Branch', branchSchema);
