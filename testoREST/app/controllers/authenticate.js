var express  = require('express');
var router   = express.Router();
var Employee = require('../models/employee');
var jwt      = require('jsonwebtoken');
var config      = require('../../config');

router.post('/', function(req, res){
	// Find user
	Employee.findOne({username: req.body.username}, function(err, employee){
		// user not found
		if(!employee){
			res.json({ success: false, message: 'Authentication failed. User not found.'});
		}else if(employee){
			if(employee.password != req.body.password){
				res.json({ success: false, message: 'Authentication failed. Invalid password.'});
			}else{

				var token = jwt.sign(employee, config.secret, {
					expiresIn: 1440 // 24h token
        		});

        		res.json({
		          success: true,
		          message: 'Login success!',
		          token: token
		        });

			}
		}
	});
});

module.exports = router;