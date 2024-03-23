const mongoose = require('mongoose');
const { Schema } = mongoose;

const positionSchema = new Schema({
  positionName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    default: 'HR',
  },
  date: {
    type: Date, // Or Date, if you prefer to store it as a date object
    required: true,
    default: Date.now(),
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    requirements: String,
    benefits: String,
    offerDetails: String,
  },
  totalApplications: {
    type: Number,
  },
  firstStage: {
    type: Number,
  },
  secondStage: {
    type: Number,
  },
  finalStage: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
});

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;
