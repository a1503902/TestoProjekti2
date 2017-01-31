var express = require('express');
var router  = express.Router();
var pug     = require('pug');

router.get('/', function(req, res){
	res.render('index', { title: 'Hey', message: 'Hello there!'});
});

module.exports = router;