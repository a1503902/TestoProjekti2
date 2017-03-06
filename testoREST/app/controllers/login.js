var express  = require('express');
var router   = express.Router();
var pug      = require('pug');
var Admin    = require('../models/admin');
var Employee = require('../models/employee');
var jwt      = require('jsonwebtoken');
var config   = require('../../config');

// Employee login
router.get('/login', function(req, res){
    var message = req.flash('message');
	res.render('login', { title: 'Kirjaudu', message: message});
});

router.post('/login', function(req, res){
	// Find employee
    Employee.findOne({
        username: req.body.username
    }, function(err, employee) {
        // Employee not found
        if (!employee) {
            req.flash('message', 'Authentication failed. Invalid username or password.');
            res.redirect('/login');
        } else if (employee) {
            if (employee.password != req.body.password) {
                req.flash('message', 'Authentication failed. Invalid username or password.');
                res.redirect('/login');
            } else {
            	var user = { id: employee._id, username: employee.username, isAdmin: false, firstname: employee.firstname, lastname: employee.lastname};
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 1440 // 24h token
                });
                req.session.token = token;
                req.flash('message', 'Login success!');
                res.redirect('/employees/start');
            }
        }
    });
});

// Admin login
router.get('/admin/login', function(req, res){
	var message = req.flash('message');
	res.render('admin/login', { title: 'Kirjaudu', message: message });
});

router.post('/admin/login', function(req, res){
    // Find admin
    Admin.findOne({
        username: req.body.username
    }, function(err, admin) {
        // Admin not found
        if (!admin) {
            req.flash('message', 'Authentication failed. Invalid username or password.');
            res.redirect('/admin/login');
        } else if (admin) {
            if (admin.password != req.body.password) {
                req.flash('message', 'Authentication failed. Invalid username or password.');
                res.redirect('/admin/login');
            } else {
            	var user = { id: admin._id, username: admin.username, isAdmin: true};
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 1440 // 24h token
                });
                req.session.token = token;
                req.flash('message', 'Login success!');
                res.redirect('/admin/tracking');
            }
        }
    });
});

module.exports = router;
