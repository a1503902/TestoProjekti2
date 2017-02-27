var express         = require('express');
var router          = express.Router();
var publicmessage   = require('../models/publicmessage');

//Get all publicMessages
router.get('/', function(req, res){
    publicmessage.find(function(err, publicMessages){
        if (err) {
            res.send({
                success: false,
                message: err
            });
        }
        res.json({
            success: true,
            data: publicMessages
        });
    });
});

router.get('/publicmessage', function (req, res) {
    publicmessage.findOne({}, {}, {sort: {'created_at': 1}}, function(err, publicMessage) {
        var found = false;
        if (err) {
            res.send({
                success: false,
                message: err
            });
        } else if (publicMessage) {
            for (var i = 0; i < publicMessage.length; i++) {
                if (publicMessage.seen[i] == req.user.id) {
                    found = true;
                }
            }
            if (!found) {
                res.json({
                    success: true,
                    data: publicMessage
                });
            } else {
                res.send({
                    success: true
                });
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

    // New car object
    var publicMessage = new publicmessage();

    // Set params
    publicMessage.title = req.body.title;
    publicMessage.message = req.body.message;

    // Insert car to DB
    var success = publicMessage.save(function(err) {
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

router.put('/seen/:publicMessageID', function(req, res) {

    // Validation
    req.checkBody({
        'id': {
            notEmpty: true,
            errorMessage: 'EmlpyeeID missing'
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

    publicmessage.findById(req.params.publicMessageID, function(err, publicmessage) {
        if (err) {
            res.send(err);
        }
        publicmessage.seen.set(req.body.id);
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