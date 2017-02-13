var express = require('express');
var router  = express.Router();
var Admin   = require('../models/admin');
var jwt     = require('jsonwebtoken');
var config  = require('../../config');
var pug     = require('pug');

router.get('/dashboard', function(req, res){
	res.json({message: 'asd'});
});

module.exports = router;