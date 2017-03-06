var express  = require('express');
var router   = express.Router();
var Message = require('../models/message');

// Get private message data
router.get('/unread', function(req, res){
    Message.find({to: req.user.id}, '_id seen', function(err, messages){
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }
        var unreadMessages = 0;
        // Loop messages
        for(var i = 0; i < messages.length; i++){
            // Default unread
            var found = false;
            for(var n = 0; n < messages[i].seen.length; n++){
                var seen = messages[i].seen[n];
                if(seen == req.user.id){
                    found = true;
                }
            }
            if(!found){
                unreadMessages++;
            }
        }

        return res.json({
            success: true,
            data: {
                unread: unreadMessages
            }
        });
    });
});

// Get message list
router.get('/list', function(req, res){
    Message.find({to: req.user.id}, '_id title seen', function(err, messages){
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }

        var messagesData = [];
        for(var i = 0; i < messages.length; i++){
            var message = { id: messages[i]._id, title: messages[i].title, unread: false };
            var found   = false;
            for(var n = 0; n < messages[i].seen.length; n++){
                var seen = messages[i].seen[n];
                if(seen == req.user.id){
                    found = true;
                }
            }
            if(!found){
                message.unread = true;
            }
            messagesData.push(message);
        }
        return res.json({
            success: true,
            data: messagesData
        });
    });
});

// Get message by id
router.get('/:id', function(req, res){
    Message.findOne({_id: req.params.id, to: req.user.id}, '_id title message seen', function(err, message){
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }
        if(message){
            var found = false;
            for(var i = 0; i < message.seen.length; i++){
                var seen = message.seen[i];
                if(seen == req.user.id){
                    found = true;
                }
            }
            if(!found){
                message.seen.push(req.user.id);
                message.save(function(err){
                    if(err){
                        return res.send(err);
                    }
                });
            }
            return res.json({
                success: true,
                data: {
                    title: message.title,
                    message: message.message
                }
            });
        }
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
    message.title = req.body.title;
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