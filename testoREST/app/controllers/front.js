var express = require('express');
var router  = express.Router();
var pug     = require('pug');

router.get('/start', function(req, res){
    res.render('startpage', { title: 'Start'});
});

router.get('/final', function(req, res){
    res.render('finalpage', { title: 'final'});
});

module.exports = router;