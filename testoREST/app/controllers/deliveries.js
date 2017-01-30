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
    // New delivery object
    var delivery  = new Delivery();

    // Set params
    delivery.name 		= req.body.name;
    delivery.delivery 	= req.body.delivery;
    delivery.pickup 	= req.body.pickup;
    delivery.unknown 	= req.body.unknown;

    // Insert delivery to DB
    delivery.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({
            success: true,
            message: 'Delivery added'
        });
    });
});

// Update delivery details
router.put('/:deliveryID', function(req, res){
    Delivery.findById(req.params.deliveryID, function (err, delivery) {
        if (err){
            res.send(err);
        }else if(req.body.name != null){
            delivery.name = req.body.name;
        }else if(req.body.delivery != null){
            delivery.delivery = req.body.delivery;
        }else if(req.body.pickup != null){
            delivery.pickup = req.body.pickup;
        }else if(req.body.unknown != null){
            delivery.unknown = req.body.unknown;
        }
        res.json({
            success: true,
            data: delivery
        });
    });
});

// Delete delivery
router.delete('/:deliveryId', function(req, res){
    Delivery.remove({
        _id: req.params.carId
    }, function(err, delivery) {
        if (err){
            res.send(err);
        }
        res.json({
            success: true,
            message: 'Delivery deleted'
        });
    });
});

module.exports = router;