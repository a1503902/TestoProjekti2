var express  = require('express');
var router   = express.Router();
var pug      = require('pug');
var Employee = require('../models/employee');

router.get('/start', function(req, res){
    res.render('startpage', { title: 'Start'});
});

router.get('/final', function(req, res){
    res.render('finalpage', { title: 'final'});
});

router.get('/logout', function(req, res){
	req.session = null;
	return res.redirect('/login');
});

module.exports = router;
