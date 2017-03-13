var express  = require('express');
var router   = express.Router();
var pug      = require('pug');
var Employee = require('../models/employee');

router.get('/start', function(req, res){

	/*
	var start = new Date(Date.parse("13.03.2017 15:00"));
   	console.log(start);

    var stop  = new Date.parse("13.3.2017 18:00").getTime()/1000;
    stop      = stop / 1000;

    console.log(stop-start);
	*/
    res.render('startpage', { title: 'Start', fullName: req.user.firstname + ' ' + req.user.lastname});

});

router.get('/final', function(req, res){
    res.render('finalpage', { title: 'final'});
});

router.get('/logout', function(req, res){
	req.session = null;
	return res.redirect('/login');
});

module.exports = router;
