var express = require('express');
var router  = express.Router();

// Get all employees
router.get('/', function(req, res){
	res.send('Get all employees');
});

// Insert new employee
router.post('/', function(req, res){
	res.send('Insert employee');
});

// Update employee details
router.put('/:employeeId', function(req, res){
	res.send(req.params);
	res.send('Update employee');
});

// Delete employee
router.delete('/:employeeId', function(req, res){
	res.send(req.params);
	res.send('Delete employee');
});

module.exports = router;