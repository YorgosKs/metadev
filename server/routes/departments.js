const { jwtAuth } = require('../middleware/auth');
const Department = require('../models/departments.models');
const Employee = require('../models/employees.models');
const router = require('express').Router();

// GET ALL DEPARTMENTS
router.get('/', jwtAuth, async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET LENGTH OF EMPLOYEES IN EACH DEPARTMENT
router.get('/employees', jwtAuth, async (req, res) => {
  try {
    const departments = await Department.find();
    const employees = await Employee.find();

    const departmentsWithEmployeeCount = departments.map((department) => {
      const employeeCount = employees.filter(
        (employee) =>
          employee.department.toString() === department._id.toString()
      ).length;
      return {
        ...department._doc,
        employeeCount,
      };
    });

    res.status(200).json(departmentsWithEmployeeCount);
  } catch (err) {
    res.status(500).json("Can't get departments");
  }
});

module.exports = router;
