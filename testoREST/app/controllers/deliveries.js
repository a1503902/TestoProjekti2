var express 	= require('express');
var router  	= express.Router();
var Delivery 	= require('../models/delivery');

// Get all deliveries
router.get('/', function(req, res){
    Delivery.find(function(err, deliveries) {
        if (err){
            res.send(err);
        }
        res.json(deliveries);
    });
});

// Find by ID ALL
router.get('/:deliveryID',function(req, res) {
	Delivery.findById(req.params.deliveryID, function(err, delivery) {
		if (err)
			res.send(err);
		res.json(delivery);
	});
});

// Find by ID name
router.get('/:deliveryID/name',function(req, res) {
    Delivery.findById(req.params.deliveryID, '-_id name', function(err, delivery) {
        if (err)
            res.send({success: false, error: err});
        res.json({
			success: true,
			data: delivery
        });
    });
});

// Find by ID delivery
router.get('/:deliveryID/delivery',function(req, res) {
    Delivery.findById(req.params.deliveryID, '-_id delivery', function(err, delivery) {
        if (err)
            res.send({success: false, error: err});
        res.json({
            success: true,
            data: delivery
        });
    });
});

// Find by ID pickup
router.get('/:deliveryID/pickup',function(req, res) {
    Delivery.findById(req.params.deliveryID, '-_id pickup', function(err, delivery) {
        if (err)
            res.send({success: false, error: err});
        res.json({
            success: true,
            data: delivery
        });
    });
});

// Find by ID unknown
router.get('/:deliveryID/unknown',function(req, res) {
    Delivery.findById(req.params.deliveryID, '-_id unknown', function(err, delivery) {
        if (err)
            res.send({success: false, error: err});
        res.json({
            success: true,
            data: delivery
        });
    });
});

// Insert new delivery
router.post('/', function(req, res){

	var message = "";

	// New delivery object
    var delivery  = new Delivery();

    // Set params
    delivery.name 		= req.body.name;
    delivery.delivery 	= req.body.delivery;
    delivery.pickup 	= req.body.pickup;
    delivery.unknown 	= req.body.unknown;

    // Insert delivery to DB
    var success = delivery.save(function(err){
        if(err){
            message = "Failed to insert delivery to db " + err;
        }
        return true;
    });

    if(success){
        message = "Employee added";
    }

	res.send('Insert delivery');
});

// Update delivery details
router.put('/:deliveryId', function(req, res){
	res.send(req.params);
	res.send('Update delivery');
});

// Delete delivery
router.delete('/:deliveryId', function(req, res){
	res.send(req.params);
	res.send('Delete delivery');
});

module.exports = router;