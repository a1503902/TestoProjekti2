var express = require('express');
var router  = express.Router();
var pug     = require('pug');

router.get('/login', function(req, res){
	res.render('admin/login', { title: 'Kirjaudu', youAreUsingPug: false});
});

module.exports = router;