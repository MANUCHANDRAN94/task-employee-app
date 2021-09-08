var mongoose = require('mongoose');
const Business = require('../models/Business');

var employeeController = {};

// Show list of ALL employees
employeeController.listAll = async (req, res) => {
	try {
		const list = await Business.find({});
		res.status(200).json({ list: list });
	} catch (err) {
		res.status(500).send({
			message: err.message || 'Error Occurred',
		});
	}
};

// Show an employee by id
employeeController.getEmployeeById = async (req, res) => {
	try {
		const currentEmployee = await Business.findById(req.params.id);
		res.status(200).json(currentEmployee);
	} catch (err) {
		res.status(500).send({
			message: err.message || 'Error Occurred',
		});
	}
};

// Create new employee
employeeController.createEmployee = async (req, res) => {
	const newEmployee = new Business(req.body);
	try {
		const savedNewEmployee = await newEmployee.save();
		res.status(200).json(savedNewEmployee);
	} catch (err) {
		res.status(500).send({
			message: err.message || 'Error Occurred',
		});
	}
};

// Update an employee
employeeController.updateEmployee = async (req, res) => {
	try {
		const updatedEmployeeDetail = await Business.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true },
		);
		res.status(200).json(updatedEmployeeDetail);
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: err.message || 'Error Occurred',
		});
	}
};

// Delete an employee
employeeController.deleteEmployee = async (req, res) => {
	try {
		const currentEmployee = await Business.findByIdAndDelete(req.params.id);
		res.status(200).json('Employee Deleted');
	} catch (err) {
		res.status(500).send({
			message: err.message || 'Error Occurred',
		});
	}
};

module.exports = employeeController;
