var express 	= require('express');
var router  	= express.Router();
var Delivery 	= require('../models/delivery');

// Get all deliveries
router.get('/deliveries', function(req, res){
	res.send('Get all deliveries');
});

// Find by ID ALL
router.get('/deliveries/:deliveryID',function(req, res) {
	Delivery.findById(req.params.deliveryID, function(err, delivery) {
		if (err)
			res.send(err);
		res.json(delivery);
	});
});

// Find by ID name
router.get('/deliveries/:deliveryID/name',function(req, res) {
    Delivery.findById(req.params.deliveryID, 'name', function(err, delivery) {
        if (err)
            res.send({success: false, error: err});
        res.json({
			success: true,
			data: delivery
        });
    });
});

// Find by ID delivery
router.get('/deliveries/:deliveryID/delivery',function(req, res) {
    Delivery.findById(req.params.deliveryID, 'delivery', function(err, delivery) {
        if (err)
            res.send({success: false, error: err});
        res.json({
            success: true,
            data: delivery
        });
    });
});

// Find by ID pickup
router.get('/deliveries/:deliveryID/pickup',function(req, res) {
    Delivery.findById(req.params.deliveryID, 'pickup', function(err, delivery) {
        if (err)
            res.send({success: false, error: err});
        res.json({
            success: true,
            data: delivery
        });
    });
});

// Find by ID unknown
router.get('/deliveries/:deliveryID/unknown',function(req, res) {
    Delivery.findById(req.params.deliveryID, 'unknown', function(err, delivery) {
        if (err)
            res.send({success: false, error: err});
        res.json({
            success: true,
            data: delivery
        });
    });
});

// Insert new delivery
router.post('/deliveries', function(req, res){
	res.send('Insert delivery');
});

// Update delivery details
router.put('/deliveries/:deliveryId', function(req, res){
	res.send(req.params);
	res.send('Update delivery');
});

// Delete delivery
router.delete('/deliveries/:deliveryId', function(req, res){
	res.send(req.params);
	res.send('Delete delivery');
});

module.exports = router;