var express = require('express');
var router  = express.Router();
var pug     = require('pug');

router.get('/', function(req, res){
	res.render('admin/login', { title: 'login', message: 'Hello there!'});
});

router.get('/start', function(req, res){
    res.render('views/startpage', { title: 'Start'});
});

router.get('/final', function(req, res){
    res.render('views/finalpage', { title: 'final'});
});

module.exports = router;