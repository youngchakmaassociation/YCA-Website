const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election',
    required: [true, 'Election is required']
  },
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Voter is required']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Candidate is required']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Ensure one vote per voter per position per election
voteSchema.index({ election: 1, voter: 1, position: 1 }, { unique: true });

// Update election vote counts when vote is saved
voteSchema.post('save', async function() {
  const Election = mongoose.model('Election');

  // Update candidate vote count in election
  await Election.updateOne(
    {
      _id: this.election,
      'positions.name': this.position,
      'positions.candidates.user': this.candidate
    },
    {
      $inc: {
        'positions.$[].candidates.$[candidate].votes': 1,
        totalVotes: 1
      }
    },
    {
      arrayFilters: [
        { 'candidate.user': this.candidate }
      ]
    }
  );
});

// Update election vote counts when vote is removed
voteSchema.post('remove', async function() {
  const Election = mongoose.model('Election');

  // Update candidate vote count in election
  await Election.updateOne(
    {
      _id: this.election,
      'positions.name': this.position,
      'positions.candidates.user': this.candidate
    },
    {
      $inc: {
        'positions.$[].candidates.$[candidate].votes': -1,
        totalVotes: -1
      }
    },
    {
      arrayFilters: [
        { 'candidate.user': this.candidate }
      ]
    }
  );
});

module.exports = mongoose.model('Vote', voteSchema);
