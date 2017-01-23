var express = require('express');
var router = express.Router();

/*
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
*/

// Get all cars
router.get('/', function(req, res){
	res.send('Get all cars');
});

// Insert new car
router.post('/', function(req, res){
	res.send('Insert car');
});

// Update car details
router.put('/:carId', function(req, res){
	res.send(req.params);
	res.send('Update car');
});

// Delete car
router.delete('/:carId', function(req, res){
	res.send(req.params);
	res.send('Delete car');
});

module.exports = router;