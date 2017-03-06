var express         = require('express');
var router          = express.Router();
var Notification   = require('../models/notification');

//Get all notifications
router.get('/', function(req, res){
    Notification.find(function(err, notifications){
        if (err) {
            res.send({
                success: false,
                message: err
            });
        }
        res.json({
            success: true,
            data: notifications
        });
    });
});

router.get('/notification', function (req, res) {
    Notification.findOne({}, {}, {sort: {'created_at': 1}}, function(err, notification) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        }else if(notification){
            var seen = false;
            var message = notification;
            for (var i = 0; i < notification.seen.length; i++) {
                if (notification.seen[i] == req.user.id) {
                    seen = true;
                    message = "";
                }
            }
            if(!seen){
                notification.seen.push(req.user.id);
                notification.save(function(err) {
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
    console.log(req.body);

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
    
    // New notification
    var notification = new Notification();

    // Set params
    notification.title = req.body.title;
    notification.message = req.body.message;

    // Insert notification to DB
    var success = notification.save(function(err) {
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