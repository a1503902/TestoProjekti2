var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PublicmMssageSchema = new Schema({
    title: String,
    message: String,
    created_at: {type:Date, default: Date.now},
    seen: [String]
});

module.exports = mongoose.model('publicmessage', PublicmMssageSchema);
