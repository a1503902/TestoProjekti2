var express = require('express');
var router  = express.Router();
var Admin   = require('../models/admin');
var jwt     = require('jsonwebtoken');
var config  = require('../../config');
var pug     = require('pug');

router.get('/tracking', function(req, res){
	res.render('admin/tracking', { title: 'Seuranta'});
});

router.get('/cars', function(req, res){
    res.render('admin/cars', { title: 'Autot'});
});

router.get('/routes', function(req, res){
	res.render('admin/routes', { title: 'Reitit'});
});

router.get('/employees', function(req, res){
	res.render('admin/employees', { title: 'Työntekijät'});
});

router.get('/password', function(req, res){
	res.render('admin/password', { title: 'Salasana'});
});

router.get('/logout', function(req, res){
	req.flash('message', 'Kirjauduttu ulos onnistuneesti.');
	return res.redirect('/admin/login');
	req.session = null;
});
module.exports = router;