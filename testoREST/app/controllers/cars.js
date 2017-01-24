var express = require('express');
var router  = express.Router();
var Car     = require('../models/car');

// Get all cars
router.get('/', function(req, res){

	req.checkParams({
		'name': {
			notEmpty: true,
			errorMessage: 'Car name missing'
		}
	});

	var error = req.getValidationResult().then(function(result) {
		if(!result.isEmpty()){
			var error = result.useFirstErrorOnly().array();
			return error[0].msg;
		}
	});
	
	res.send('asdasdcfffffffffffffff');
	return;

	/*
	Car.find(function(err, cars) {
        if (err){
            res.send(err);
        }
        res.json(cars);
    });
    */
});

// Insert new car
router.post('/', function(req, res){

	var message = "";
	var success = false;
	// New car object
	var car  = new Car();

	req.checkBody({
		'name': {
			notEmpty: true,
			errorMessage: 'Car name missing'
		}
	});

	req.getValidationResult().then(function(result) {
		return res.send('asasdasdasd');
	});


	// Set params
	car.name = req.body.name;

	// Insert car to DB
	var success = car.save(function(err){
		if(err){
			message = "Failed to insert car to db " + err;
		}
		return true;
	});
	if(success){
		success = true;
		message = "Car added";
	}
	
	res.json({success: success, message: message});

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