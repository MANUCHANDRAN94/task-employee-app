var express = require('express');
var router = express.Router();
var employeeController = require('../controllers/EmployeeController.js');

// Get all employees
router.get('/', employeeController.listAll);

// Get single employee by id
router.get('/:id', employeeController.getEmployeeById);

// Create employee
router.post('/', employeeController.createEmployee);

// Edit employee
router.put('/:id', employeeController.updateEmployee);

// Delete update
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
