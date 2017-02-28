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
            for (var i = 0; i < publicmessage.length; i++) {
                if (publicmessage.seen[i] == req.user.id) {
                    res.send({
                        success: true,
                        data: false
                    });
                }else{
                    res.json({
                        success: true,
                        data: publicmessage
                    });
                }
            }
        }
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
        success: success,
        message: message
    });
});

router.put('/seen/:publicmessageID', function(req, res) {

    publicmessage.findById(req.params.publicmessageID, function(err, publicmessage) {
        if (err) {
            res.send(err);
        }
        publicmessage.seen.push(req.user.id);
        console.log(publicmessage.seen);
        publicmessage.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({
                success: true,
                message: 'Message seen'
            });
        });
    });
});

module.exports = router;