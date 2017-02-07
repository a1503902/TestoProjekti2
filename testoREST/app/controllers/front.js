var express = require('express');
var router  = express.Router();
var pug     = require('pug');

router.get('/', function(req, res){
	res.render('login', { title: 'login', message: 'Hello there!'});
});

router.get('/start', function(req, res){
    res.render('startpage', { title: 'Start'});
});

router.get('/final', function(req, res){
    res.render('finalpage', { title: 'final'});
});

module.exports = router;