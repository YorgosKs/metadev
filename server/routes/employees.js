const { jwtAuth } = require('../middleware/auth');
const Employee = require('../models/employees.models');
const Department = require('../models/departments.models');
const e = require('express');
const router = require('express').Router();

// GET ALL EMPLOYEES
router.get('/', jwtAuth, async (req, res) => {
  try {
    const employees = await Employee.find();
    const departments = await Department.find();

    const employeesWithDepartmentName = employees.map((employee) => {
      const department = departments.find(
        (dept) => dept._id.toString() === employee.department.toString() // ensure both are strings
      );
      return {
        ...employee._doc,
        department: department ? department.departmentName : 'Unknown', // handle the case where no department is found
      };
    });

    res.json(employeesWithDepartmentName); // send response in try block
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET EMPLOYEE BY ID
router.get('/:id', jwtAuth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE EMPLOYEE
router.post('/', jwtAuth, async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const employee = await newEmployee.save();
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE EMPLOYEE
router.put('/:id', jwtAuth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee.userId === req.body.userId) {
      await employee.updateOne({ $set: req.body });
      res.status(200).json('Employee has been updated!');
    } else {
      res.status(403).json('You can update only your employee!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE EMPLOYEE
router.delete('/:id', jwtAuth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee.userId === req.body.userId) {
      await employee.deleteOne();
      res.status(200).json('Employee has been deleted!');
    } else {
      res.status(403).json('You can delete only your employee!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
