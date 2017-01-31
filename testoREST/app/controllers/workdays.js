var express = require('express');
var router  = express.Router();
var Workday = require('../models/workday')

// Get all workdays
router.get('/', function(req, res){
	Workday.find({}, function(err, workdays) {
		if (err) throw err
		res.json(workdays)
	})
});

// Insert new workday
router.post('/', function(req, res){
	res.send('Insert workday');
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
