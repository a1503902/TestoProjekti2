var express = require('express');
var router  = express.Router();
var Admin   = require('../models/admin');
var jwt     = require('jsonwebtoken');
var config  = require('../../config');
var pug     = require('pug');

router.get('/tracking', function(req, res){
	var page = "tracking";
	res.render('admin/tracking', { title: 'Seuranta', page: page});
});

router.get('/cars', function(req, res){
	var page = "cars";
    res.render('admin/cars', { title: 'Autot', page: page});
});

router.get('/routes', function(req, res){
	var page="routes";
	res.render('admin/routes', { title: 'Reitit', page: page});
});

router.get('/employees', function(req, res){
	var page="emplyees";
	res.render('admin/employees', { title: 'Työntekijät', page: page});
});

router.get('/password', function(req, res){
	var page="password";
	res.render('admin/password', { title: 'Salasana', page: page});
});

module.exports = router;