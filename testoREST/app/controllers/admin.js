var express = require('express');
var router  = express.Router();
var Admin   = require('../models/admin');
var jwt     = require('jsonwebtoken');
var config  = require('../../config');
var pug     = require('pug');

router.get('/tracking', function(req, res){
	res.render('admin/tracking', { title: 'Tracking'});
});

module.exports = router;