var express = require('express');
var router = express.Router();
var Route = require('../models/route');

// Get all routes
router.get('/', function(req, res) {
    Route.find(function(err, routes) {
        if (err) {
            res.send({
                        success: false,
                        message: err
            });
        }
        res.json({
                    success: true,
                    data: routes
        });
    });
});

// Find by ID
router.get('/:routeID', function(req, res) {
    Route.findById(req.params.routeID, function(err, route) {
        if (err)
            res.send(err);
        res.json(route);
    });
});

// Find by ID name
router.get('/:routeID/name', function(req, res) {
    Route.findById(req.params.routeID, '-_id name', function(err, route) {
        if (err)
            res.send({
                success: false,
                error: err
            });
        res.json({
            success: true,
            data: route
        });
    });
});

// Insert new route
router.post('/', function(req, res) {
    // Validation
    req.checkBody({
        'name': {
            notEmpty: true,
            errorMessage: 'Name missing'
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

    // New delivery object
    var route = new Route();

    // Set params
    route.name = req.body.name;

    // Insert delivery to DB
    route.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({
            success: true,
            message: 'Route added'
        });
    });
});

// Update route details
router.put('/:routeID', function(req, res) {
    // Validation
    req.checkBody({
        'name': {
            notEmpty: true,
            errorMessage: 'Route name missing'
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

    Route.findById(req.params.routeID, function(err, route) {
        if (err) {
            res.send(err);
        }
        route.name = req.body.name;
        route.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({
                success: true,
                message: 'Route updated'
            });
        });
    });
});

// Delete route
router.delete('/:routeID', function(req, res) {
    Route.remove({
        _id: req.params.routeID
    }, function(err) {
        if (err) {
            res.send(err);
        }
        res.json({
            success: true,
            message: 'Route successfully deleted'
        });
    });
});

module.exports = router;
