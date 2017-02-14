var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NotificationSchema = new Schema({
    title: String,
    message: String,
    to: String
});

module.exports = mongoose.model('Notification', NotificationSchema);
