var express = require('express');
var router  = express.Router();
var Admin   = require('../models/admin');
var jwt     = require('jsonwebtoken');
var config  = require('../../config');


router.get('/setup', function(req, res){
	// New admin object
	var admin  = new Admin();

	// Set params
	admin.username = "admin";
	admin.password = "admin";

	// Insert admin to DB
	var success = admin.save(function(err){
		if(err){
			message = "Failed to insert admin to db " + err;
			return false;
		}
		return true;
	});
	if(success){
		message = "Admin added";
	}
	res.json({success: success, message: message});
});

router.post('/', function(req, res){
	// Find user
	Admin.findOne({username: req.body.username}, function(err, admin){
		// user not found
		if(!admin){
			res.json({ success: false, message: 'Authentication failed. User not found.'});
		}else if(admin){
			if(admin.password != req.body.password){
				res.json({ success: false, message: 'Authentication failed. Invalid password.'});
			}else{

				var token = jwt.sign(admin, config.secret, {
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