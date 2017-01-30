var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DeliverySchema   = new Schema({
    name: String,
    delivery: Number,
    pickup: Number,
    unknown: Number
});
module.exports = mongoose.model('Delivery', DeliverySchema);
