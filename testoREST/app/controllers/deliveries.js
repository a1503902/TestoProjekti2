var express = require('express');
var router  = express.Router();

// Get all deliveries
router.get('/', function(req, res){
	res.send('Get all deliveries');
});

// Insert new delivery
router.post('/', function(req, res){
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