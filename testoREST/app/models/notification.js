var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var notificationSchema = new Schema({
    title: String,
    message: String,
    created_at: {type:Date, default: Date.now},
    seen: [String]
});

module.exports = mongoose.model('notification', notificationSchema);
