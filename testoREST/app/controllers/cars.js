var express = require('express');
var router = express.Router();
var Car = require('../models/car');

// Get all cars
router.get('/', function(req, res) {
    Car.find('_id name', function(err, cars) {
        if (err) {
            res.send({
                        success: false,
                        message: err
            });
        }
        res.json({
                    success: true,
                    data: cars
        });
    });
});

// Get car by id
router.get('/:carId', function(req, res) {
    Car.findById(req.params.carId, '-__v', function(err, car) {
        if (err) {
            res.send({
                success: false,
                message: "Car not found"
            });
        }
        res.send({
            success: true,
            data: car
        });
    });
});

// Insert new car
router.post('/', function(req, res) {

    var message = "";
    var success = false;

    // Validation
    req.checkBody({
        'name': {
            notEmpty: true,
            errorMessage: 'Car name missing'
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

    // New car object
    var car = new Car();

    // Set params
    car.name = req.body.name;

    // Insert car to DB
    var success = car.save(function(err) {
        if (err) {
            message = "Failed to insert car to db " + err;
        }
        return true;
    });

    if (success) {
        message = "Car added";
    }

    res.json({
        success: success,
        message: message
    });

});

// Update car details
router.put('/:carId', function(req, res) {

    // Validation
    req.checkBody({
        'name': {
            notEmpty: true,
            errorMessage: 'Car name missing'
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

    Car.findById(req.params.carId, function(err, car) {
        if (err) {
            res.send(err);
        }
        car.name = req.body.name;
        car.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({
                success: true,
                message: 'Car updated!'
            });
        });
    });
});

// Delete car
router.delete('/:carId', function(req, res) {
    Car.remove({
        _id: req.params.carId
    }, function(err, car) {
        if (err) {
            res.send(err);
        }
        res.json({
            success: true,
            message: 'Car successfully deleted'
        });
    });
});

module.exports = router;
