var express = require('express');
var router  = express.Router();
var Admin   = require('../models/admin');
var jwt     = require('jsonwebtoken');
var config  = require('../../config');
var pug     = require('pug');

router.get('/tracking', function(req, res){
	res.render('admin/tracking', { title: 'Tracking'});
});

router.get('/cars', function(req, res){
    res.render('admin/cars', { title: 'Cars'});
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

module.exports = router;