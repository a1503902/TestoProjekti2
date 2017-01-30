var express  = require('express');
var router   = express.Router();
var Employee = require('../models/employee');

// Get all employees
router.get('/', function(req, res){
	Employee.find(function(err, employees) {
        if (err){
            res.send(err);
        }
        res.json(employees);
    });
});

// Get employee by id
router.get('/:employeeId', function(req, res){
	Employee.findById(req.params.employeeId, function(err, employee) {
		if(err){
			res.send({success: false, message: "Employee not found"});
		}
		res.send({success: true, data: employee});
	});
});

// Insert new employee
router.post('/', function(req, res){
	var message = "";
	var success = false;

	// Validation
	req.checkBody({
		'firstname': {
			notEmpty: true,
			errorMessage: 'Employee first name missing'
		},
		'lastname': {
			notEmpty: true,
			errorMessage: 'Employee last name missing'
		},
		'username': {
			notEmpty: true,
			errorMessage: 'Employee username missing'
		},
		'password': {
			notEmpty: true,
			errorMessage: 'Employee password missing'
		}
	});

	var errors = req.validationErrors();
	if (errors) {
		message = errors[0].msg;
		res.send({success: success, message: message});
		return;
	}

	// New employee object
	var employee  = new Employee();

	// Set params
	employee.firstname = req.body.firstname;
	employee.lastname  = req.body.lastname;
	employee.password  = req.body.password;
	employee.username  = req.body.username;

	// Insert employee to DB
	var success = employee.save(function(err){
		if(err){
			message = "Failed to insert employee to db " + err;
		}
		return true;
	});

	if(success){
		message = "Employee added";
	}
	
	res.json({success: success, message: message});
});

// Update employee details
router.put('/:employeeId', function(req, res){

	// Validation
	req.checkBody({
		'firstname': {
			notEmpty: true,
			errorMessage: 'Employee first name missing'
		},
		'lastname': {
			notEmpty: true,
			errorMessage: 'Employee last name missing'
		}
	});

	var errors = req.validationErrors();
	if (errors) {
		message = errors[0].msg;
		res.send({success: false, message: message});
		return;
	}

	Employee.findById(req.params.employeeId, function(err, employee) {
        if (err){
            res.send(err);
        }
		employee.firstname = req.body.firstname;
		employee.lastname  = req.body.lastname;
        employee.save(function(err) {
            if (err){
                res.send(err);
            }
            res.json({ success: true, message: 'Employee updated!' });
        });
    });
});

// Delete employee
router.delete('/:employeeId', function(req, res){
	Employee.remove({
        _id: req.params.employeeId
    }, function(err, employee) {
        if (err){
            res.send(err);
        }
        res.json({ success: true, message: 'Employee successfully deleted' });
    });
});

module.exports = router;