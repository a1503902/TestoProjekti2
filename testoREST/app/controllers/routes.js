var express = require('express');
var router  = express.Router();

// Get all routes
router.get('/', function(req, res){
	res.send('Get all routes');
});

// Insert new route
router.post('/', function(req, res){
	res.send('Insert route');
});

// Update route details
router.put('/:routeId', function(req, res){
	res.send(req.params);
	res.send('Update route');
});

// Delete route
router.delete('/:routeId', function(req, res){
	res.send(req.params);
	res.send('Delete route');
});

module.exports = router;