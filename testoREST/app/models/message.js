var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema = new Schema({
	title: String,
	message: String,
	to: [String],
	seen: [String],
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
