const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
  departmentName: {
    type: String,
    required: true,
  },
  departmentDescription: {
    type: String,
    required: true,
  },
  departmentStatus: {
    type: Boolean,
    required: true,
  },
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
