var express = require('express');
var router  = express.Router();
var pug     = require('pug');

router.get('/', function(req, res){
	res.render('index', { title: 'Hey', message: 'Hello there!'});
});

router.get('/start', function(req, res){
    res.render('startpage', { title: 'Start'});
});

router.get('/final', function(req, res){
    res.render('finalpage', { title: 'Start'});
});

module.exports = router;