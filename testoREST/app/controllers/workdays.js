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
    req.checkBody({
		'start_time': {
            notEmpty: true,
            errorMessage: 'Start time missing'
        },
		'start_km': {
            notEmpty: true,
            errorMessage: 'Start kilometers missing'
        }
    });

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
    var deliveries = {};
    var postnord = {};
	var bring = {};
	var innight = {};
    postnord.delivery = req.body.deliveries.postnord.delivery;
	bring.delivery = req.body.deliveries.bring.delivery;
	postnord.pickup = req.body.deliveries.postnord.pickup;
	bring.pickup = req.body.deliveries.bring.pickup;
	postnord.unknown = req.body.deliveries.postnord.unknown;
	bring.dhl_return = req.body.deliveries.bring.dhl_return;
	postnord.nt = req.body.deliveries.postnord.nt;
	bring.nt = req.body.deliveries.bring.nt;
	innight.packages = req.body.deliveries.innight.packages;
	innight.stops = req.body.deliveries.innight.stops;
	deliveries.postnord = postnord;
	deliveries.bring = bring;
	deliveries.innight = innight;
	workday.deliveries = deliveries;
	workday.stop_time = req.body.stop_time;
	workday.stop_km = req.body.stop_km;
	workday.adt_info = req.body.adt_info;

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
