var express  = require('express');
var router   = express.Router();
var Notification = require('../models/notification');

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
