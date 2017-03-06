var express         = require('express');
var router          = express.Router();
var publicmessage   = require('../models/publicmessage');

//Get all publicmessages
router.get('/', function(req, res){
    publicmessage.find(function(err, publicmessages){
        if (err) {
            res.send({
                success: false,
                message: err
            });
        }
        res.json({
            success: true,
            data: publicmessages
        });
    });
});

router.get('/publicmessage', function (req, res) {
    publicmessage.findOne({}, {}, {sort: {'created_at': 1}}, function(err, publicmessage) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        }else if(publicmessage){
            var seen = false;
            var message = publicmessage;
            for (var i = 0; i < publicmessage.seen.length; i++) {
                if (publicmessage.seen[i] == req.user.id) {
                    seen = true;
                    message = "";
                }
            }
            if(!seen){
                publicmessage.seen.push(req.user.id);
                publicmessage.save(function(err) {
                    if (err) {
                        return res.send(err);
                    }
                });
            }
        }
        return res.send({
            success: true,
            message: message
        });

    });
});

router.post('/', function (req, res) {
    var message = "";
    var success = false;

    // Validation
    req.checkBody({
        'title': {
            notEmpty: true,
            errorMessage: 'Title missing'
        },
        'message': {
            notEmpty: true,
            errorMessage: 'Message missing'
        }
    });

    var errors = req.validationErrors();
    if (errors) {
        message = errors[0].msg;
        res.send({
            success: false,
            message: message
        });
        return;
    }
    
    // New publicmessage
    var publicmessage = new publicmessage();

    // Set params
    publicmessage.title = req.body.title;
    publicmessage.message = req.body.message;

    // Insert publicmessage to DB
    var success = publicmessage.save(function(err) {
        if (err) {
            message = "Failed to insert message to db " + err;
        }
        return true;
    });

    if (success) {
        message = "Public message sent";
    }

    res.json({
        success: true,
        message: message
    });
});

module.exports = router;