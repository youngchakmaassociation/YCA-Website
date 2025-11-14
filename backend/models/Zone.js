const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Zone name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Zone name cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  headquarters: {
    type: String,
    trim: true
  },
  coordinator: {
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
  region: {
    type: String,
    trim: true
  },
  memberCount: {
    type: Number,
    default: 0
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
zoneSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Update member count when users are added/removed
zoneSchema.methods.updateMemberCount = async function() {
  const User = mongoose.model('User');
  this.memberCount = await User.countDocuments({ zone: this._id, isActive: true });
  await this.save();
};

module.exports = mongoose.model('Zone', zoneSchema);
