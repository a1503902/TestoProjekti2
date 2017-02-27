var express  = require('express');
var router   = express.Router();
var Message = require('../models/message');

// Get private message data
router.get('/unseen', function(req, res){
    console.log(req.user);
    Message.find({to: req.user.id}, '_id seen', function(err, messages){
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }

        var unseenMessages = 0;
        for(var i = 0; i < messages.length; i++){
            var found = false;
            for(var n = 0; messages[i].seen.length; n++){
                var seen = messages[i].seen[n];
                if(seen == req.user.id){
                    found = true;
                }
            }
            if(!found){
                unseenMessages++;
            }
        }

        return res.json({
            success: true,
            data: {
                unseen: unseenMessages
            }
        });
    });

});

// Insert new message
router.post('/', function(req, res) {

    // Validation
    req.checkBody({
        'title': {
            notEmpty: true,
            errorMessage: 'Message title missing'
        },
        'message': {
            notEmpty: true,
            errorMessage: 'Message content missing'
        },
        'to': {
            notEmpty: true,
            errorMessage: 'Message receiver missing'
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
    var message = new Message();

    // Set params
    message.title = req.body.message;
    message.message = req.body.message;
    message.to = [];
    for(var i = 0; i < req.body.to.length; i++){
        message.to.push(req.body.to[i]);
    }

    // Insert message to DB
    message.save(function(err) {
        if (err) {
            return res.json({success: false, message: err});
        }
        return res.json({success: true, message: "Message sent"});
    });

});

module.exports = router;