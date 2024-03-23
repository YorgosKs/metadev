const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  jobTitle: String,
  department: mongoose.Schema.Types.ObjectId,
  working: Boolean,
  employeeStatus: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
