var express = require('express');
var router  = express.Router();

var Car     = require('../models/car');

// Get all cars
router.get('/', function(req, res){
	res.send('Get all cars');
});

// Insert new car
router.post('/', function(req, res){

	// New car object
	var car  = new Car();
	
	// Set params
	car.name = req.body.name;
	
	//TODO: Validation

	// Insert car to DB
	car.save(function(err){
		if(err){
			res.send(err);
		}
		res.json({message: "Car created"});
	});

});

// Update car details
router.put('/:carId', function(req, res){
	res.send(req.params);
	res.send('Update car');
});

// Delete car
router.delete('/:carId', function(req, res){
	res.send(req.params);
	res.send('Delete car');
});

module.exports = router;