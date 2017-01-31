var express = require('express');
var router  = express.Router();
var Workday = require('../models/workday')

// Get all workdays
router.get('/', function(req, res){
	Workday.find(function(err, workdays) {
		if (err) throw err
		res.json(workdays)
	})
});

// Insert new workday
router.post('/', function(req, res) {

    var message = "";
    var success = false;

    // Validation
    // req.checkBody({
	// 	'start_time': {
    //         notEmpty: true,
    //         errorMessage: 'Start time missing'
    //     },
	// 	'start_km': {
    //         notEmpty: true,
    //         errorMessage: 'Start kilometers missing'
    //     }
    // });

    var errors = req.validationErrors();
    if (errors) {
        message = errors[0].msg;
        res.send({
            success: false,
            message: message
        });
        return;
    }

    // New workday object
    var workday = new Workday();

    // Set params
    workday.employee = req.body.employee;
	workday.start_time = req.body.start_time;
	workday.start_km = req.body.start_km;
	workday.deliveries = req.body.deliveries.postnord.delivery;
	console.log(req.body.deliveries)

    // Insert car to DB
    var success = workday.save(function(err) {
        if (err) {
            message = "Failed to insert workday to db " + err;
			console.log(err)
			return false;
        }
        return true;
    });

    if (success) {
        message = "workday added";
    }

    res.json({
        success: true,
        message: message
    });

});

// Update workday details
router.put('/:workdayId', function(req, res){
	res.send(req.params);
	res.send('Update workday');
});

// Delete workday
router.delete('/:workdayId', function(req, res){
	res.send(req.params);
	res.send('Delete workday');
});

module.exports = router;
